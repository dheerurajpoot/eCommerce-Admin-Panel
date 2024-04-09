import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { getUsers } from "../features/customers/customerSlice";
import Customers from "./Customers";

const columns = [
	{
		title: "S No.",
		dataIndex: "key",
	},
	{
		title: "ID",
		dataIndex: "_id",
	},
	{
		title: "User Name",
		dataIndex: "name",
		sorter: (a, b) => a.name.length - b.name.length,
	},
	{
		title: "Product",
		dataIndex: "product",
	},
	{
		title: "Status",
		dataIndex: "orderStatus",
	},
	{
		title: "Payment",
		dataIndex: "payment",
	},
	{
		title: "Ammount",
		dataIndex: "ammount",
		sorter: (a, b) => a.ammount.length - b.ammount.length,
	},
	{
		title: "Payment ID",
		dataIndex: "id",
	},
	{
		title: "Date",
		dataIndex: "date",
	},
	{
		title: "Action",
		dataIndex: "action",
	},
];

const Dashboard = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getOrders());
		dispatch(getUsers());
	}, [dispatch]);

	const getAllOrders = useSelector((state) => state.auth.orders);
	const getAllCustomers = useSelector((state) => state.customer.customers);
	const data = [];
	for (let i = 0; i < getAllOrders.length; i++) {
		if (getAllOrders) {
			data.push({
				key: i + 1,
				_id: getAllOrders[i]._id,
				name: getAllOrders[i].orderBy.name,
				product: getAllOrders[i].products.map((i, index) => {
					return <p key={index}>{i.product.title}</p>;
				}),
				payment: getAllOrders[i].paymentIntent.method,
				id: getAllOrders[i].paymentIntent.id,
				ammount: `₹ ${getAllOrders[i].paymentIntent.ammount}`,
				orderStatus: getAllOrders[i].orderStatus,
				date: new Date(getAllOrders[i].createdAt).toLocaleString(),
				action: (
					<>
						<div className='flex gap-3'>
							<Link className='text-lg'>
								<FaEdit />
							</Link>
							<Link className='text-xl'>
								<MdDeleteOutline />
							</Link>
						</div>
					</>
				),
			});
		}
	}

	return (
		<>
			<h2 className='text-xl font-bold'>Dashboard</h2>
			<section>
				<div className='flex justify-center items-center gap-10 my-8'>
					<div className='w-[30%] shadow-lg border rounded flex justify-center items-center'>
						<div>
							<p className='my-5 text-gray-400'>Total Sells</p>
							<h3 className='text-2xl font-bold my-5'>$3878</h3>
						</div>
					</div>
					<div className='w-[30%] shadow-lg border rounded flex justify-center items-center'>
						<div>
							<p className='my-5 text-gray-400'>
								Average Order Value
							</p>
							<h3 className='text-2xl font-bold my-5'>$378</h3>
						</div>
					</div>
					<div className='w-[30%] shadow-lg border rounded flex justify-center items-center'>
						<div>
							<p className='my-5 text-gray-400'>Total Orders</p>
							<h3 className='text-2xl font-bold my-5'>
								{getAllOrders.length}
							</h3>
						</div>
					</div>
					<div className='w-[30%] shadow-lg border rounded flex justify-center items-center'>
						<div>
							<p className='my-5 text-gray-400'>
								Total Customers
							</p>
							<h3 className='text-2xl font-bold my-5'>
								{getAllCustomers.length}
							</h3>
						</div>
					</div>
				</div>
				<div className='my-5'>
					<h2 className='text-xl mb-2 font-bold'>Recent Orders</h2>
					<Table columns={columns} dataSource={data} />
				</div>
				<div className='my-5'>
					<Customers />
				</div>
			</section>
		</>
	);
};

export default Dashboard;
