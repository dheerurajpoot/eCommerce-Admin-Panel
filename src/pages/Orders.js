import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

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

const Orders = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getOrders());
	}, [dispatch]);

	const getAllOrders = useSelector((state) => state.auth.orders);
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
		<div className='my-5'>
			<h2 className='text-xl my-4 font-bold'>Orders</h2>
			<Table columns={columns} dataSource={data} />
		</div>
	);
};

export default Orders;
