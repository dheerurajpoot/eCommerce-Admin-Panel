import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/auth/authSlice";
import { getUsers } from "../features/customers/customerSlice";
import Customers from "./Customers";
import { FcSalesPerformance } from "react-icons/fc";
import { RiCustomerService2Line } from "react-icons/ri";
import { HiMiniReceiptPercent } from "react-icons/hi2";
import { FaSellsy } from "react-icons/fa";
import { FaSitemap } from "react-icons/fa6";

const columns = [
	{
		title: "S No.",
		dataIndex: "key",
	},
	{
		title: "Order ID",
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
		title: "Product ID",
		dataIndex: "productId",
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
];

const Dashboard = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getOrders());
		dispatch(getUsers());
	}, [dispatch]);

	const getAllOrders = useSelector((state) => state.auth?.orders);
	const getAllCustomers = useSelector((state) => state.customer?.customers);
	const data = [];
	for (let i = 0; i < getAllOrders?.length; i++) {
		if (getAllOrders) {
			data.push({
				key: i + 1,
				_id: getAllOrders[i]?._id,
				name: getAllOrders[i]?.shippingInfo?.name,
				product: getAllOrders[i]?.orderItems?.map((i, index) => {
					return <p key={index}>{i?.product?.title}</p>;
				}),
				productId: getAllOrders[i]?.orderItems?.map((i, index) => {
					return <p key={index}>{i?.product?._id}</p>;
				}),
				id: getAllOrders[i]?.paymentInfo?.razorpayPaymentId,
				ammount: `₹ ${getAllOrders[i]?.priceAfterDiscount}`,
				orderStatus: getAllOrders[i]?.orderStatus,
				date: new Date(getAllOrders[i]?.createdAt).toLocaleString(),
			});
		}
	}
	let totalOrdersAmount = 0;

	getAllOrders.forEach((items) => {
		totalOrdersAmount += items?.priceAfterDiscount;
	});
	return (
		<>
			<h2 className='text-xl font-bold'>Dashboard</h2>
			<section>
				<div className='flex justify-center items-center gap-10 my-8'>
					<div className='w-[20%] shadow-lg border rounded flex justify-center gap-10 items-center'>
						<div>
							<FcSalesPerformance size={40} />
						</div>
						<div>
							<p className='my-5 text-gray-400'>Total Sells</p>
							<h3 className='text-2xl text-green-700 font-bold my-5'>
								{`₹${totalOrdersAmount}`}
							</h3>
						</div>
					</div>
					<div className='w-[20%] shadow-lg border rounded flex justify-center gap-10 items-center'>
						<div>
							<HiMiniReceiptPercent size={40} />
						</div>
						<div>
							<p className='my-5 text-gray-400'>
								Average Order Value
							</p>
							<h3 className='text-2xl font-bold text-green-700 my-5'>
								{`₹${Math.floor(
									totalOrdersAmount / getAllOrders.length
								)}`}
							</h3>
						</div>
					</div>
					<div className='w-[20%] shadow-lg border rounded flex justify-center gap-10 items-center'>
						<div>
							<FaSellsy size={40} />
						</div>
						<div className='text-center'>
							<p className='my-5 text-gray-400'>Total Orders</p>
							<h3 className='text-2xl text-green-700 font-bold my-5'>
								{getAllOrders.length}
							</h3>
						</div>
					</div>
					<div className='w-[20%] shadow-lg border rounded flex justify-center gap-10 items-center'>
						<div>
							<RiCustomerService2Line size={40} />
						</div>
						<div className='text-center'>
							<p className='my-5  text-gray-400'>
								Total Customers
							</p>
							<h3 className='text-2xl text-green-700 font-bold my-5'>
								{getAllCustomers.length}
							</h3>
						</div>
					</div>
					<div className='w-[20%] shadow-lg border rounded flex justify-center gap-10 items-center'>
						<div>
							<FaSitemap size={40} />
						</div>
						<div className='text-center'>
							<p className='my-5 text-gray-400'>Total Products</p>
							<h3 className='text-2xl text-green-700 font-bold my-5'>
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
