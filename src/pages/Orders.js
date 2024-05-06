import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import { IoMdEye } from "react-icons/io";

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

	const userAllOrders = useSelector((state) => state.auth?.orders);
	const getAllOrders = [...userAllOrders].reverse();
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
				action: (
					<>
						<div className='flex gap-3'>
							<Link
								to={`/admin/order/${getAllOrders[i]?._id}`}
								className='text-lg'>
								<IoMdEye />
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
