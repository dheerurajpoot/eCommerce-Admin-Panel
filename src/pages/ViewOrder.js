import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, updateOrderStatus } from "../features/auth/authSlice";
import { FaCheckCircle } from "react-icons/fa";

const ViewOrder = () => {
	const location = useLocation();
	const orderId = location.pathname.split("/")[3];

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getOrders());
	}, [dispatch]);

	const allOrders = useSelector((state) => state.auth.orders);
	const order = allOrders.find((order) => order._id === orderId);
	if (!order) {
		// If order not found, return a message or component indicating that the order was not found
		return <p>Order not found</p>;
	}

	const setOrderStatus = (e) => {
		const data = { id: orderId, orderStatus: e };
		dispatch(updateOrderStatus(data));
	};

	return (
		<>
			<section className='bg-[#edf1f7]'>
				<div className='py-16 bg-blueGray-100'>
					<div className='container px-4 mx-auto'>
						<div className='pb-9 mb-10 lg:mb-11 text-center border-b border-black border-opacity-5'>
							<h2 className='text-5xl xl:text-5xl leading-normal font-heading font-medium text-center'>
								Order Details
							</h2>
						</div>
						<div className='flex flex-wrap pb-3 lg:pb-11'>
							<div className='lg:flex w-full lg:w-7/12 mb-14 lg:mb-0'>
								<div className='flex justify-center sm:justify-start items-center mb-3 lg:mb-0'>
									<h3 className='mr-3 lg:mr-7 text-lg xl:text-xl font-heading font-medium'>
										Status:
									</h3>

									<FaCheckCircle
										size={30}
										className='mr-2 text-green-600'
									/>
								</div>
								<h3 className='text-lg xl:text-xl font-heading font-medium text-center sm:text-left'>
									Payment completed successfully!
								</h3>
							</div>
							<div className='w-full lg:w-5/12'>
								<h3 className='text-lg xl:text-xl font-heading font-medium text-right'>
									Order number: {order?._id}
								</h3>
							</div>
						</div>
						<div className='p-8 xl:py-14 xl:px-16 mb-14 xl:mb-16 bg-white rounded-3xl'>
							{order?.products?.map((product, index) => (
								<div
									key={index}
									className='lg:flex lg:items-center lg:justify-between pb-7 xl:pb-9 mb-7 xl:mb-9 border-b border-black border-opacity-5'>
									<div className='w-full lg:w-7/12'>
										<div className='sm:flex sm:items-center mb-6 lg:mb-0'>
											<Link>
												<img
													className='sm:pl-7 mb-6 sm:mb-0 sm:mr-12 mx-auto sm:ml-0 h-24 object-cover'
													src={`${product?.product?.images[0]?.url}`}
													alt=''
												/>
											</Link>
											<div>
												<Link className='inline-block mb-4 text-lg font-heading font-medium hover:underline'>
													{product?.product?.title}
												</Link>
												<div className='flex flex-wrap'>
													<p className='mr-4 text-sm font-heading font-medium'>
														<span>Color:</span>
														<span className='ml-2 text-gray-400 font-body'>
															{product?.color}
														</span>
													</p>
													<p className='text-sm font-heading font-medium'>
														<span>Order Date:</span>
														<span className='ml-2 text-gray-400 font-body'>
															{new Date(
																order?.createdAt
															).toDateString()}
														</span>
													</p>
												</div>
											</div>
										</div>
									</div>
									<div>
										<select
											name='orderStatus'
											id='orderStatus'
											defaultValue={
												order ? order : "Processing"
											}
											onChange={(e) =>
												setOrderStatus(e.target.value)
											}
											className='text-md border px-3 py-1 rounded'>
											<option value='Delivered'>
												Delivered
											</option>
											<option value='Dispatched'>
												Dispatched
											</option>
											<option value='Cancelled'>
												Cancelled
											</option>
											<option value='Processing'>
												Processing
											</option>
											<option value='Shipped'>
												Shipped
											</option>
										</select>
									</div>
									<div className='lg:w-4/12 xl:w-3/12 2xl:w-2/12'>
										<div className='relative xl:right-20 flex justify-between flex-wrap sm:px-7 lg:pl-0'>
											<p className='flex items-center text-sm'>
												<span className='mr-3 font-heading font-medium'>
													Qty:
												</span>
												<span className='text-lg text-gray-400 font-body'>
													{product?.count}
												</span>
											</p>
											<p className='flex items-center text-sm text-blue-500 font-heading font-medium'>
												<span className='mr-2'>₹</span>
												<span className='text-lg xl:text-xl'>
													{product?.product?.price}
												</span>
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
						<div className='lg:flex xl:items-center w-full'>
							<div className='lg:w-2/12 xl:w-1/12 mb-10 xl:mb-0'>
								<h3 className='text-xl font-heading font-medium'>
									Summary
								</h3>
							</div>
							<div className='w-full lg:w-10/12 xl:w-11/12'>
								<div className='flex flex-wrap lg:justify-end -mx-3'>
									<div className='w-full sm:w-1/2 lg:w-4/12 xl:w-3/12 px-3 mb-6 xl:mb-0'>
										<div className='relative flex items-center justify-between py-4 px-10 leading-8 bg-white bg-opacity-50 font-medium rounded-3xl'>
											<div className='absolute left-3 flex justify-center items-center w-20 h-20 bg-white rounded-full'>
												<div className='flex justify-center items-center w-11 h-11 text-xl text-white font-bold bg-blue-500 rounded-full'>
													{order.products.length}
												</div>
											</div>
											<span className='ml-16'>
												Products
											</span>
										</div>
									</div>
									<div className='w-full sm:w-1/2 lg:w-4/12 xl:w-3/12 px-3 mb-3 xl:mb-0'>
										<div className='flex items-center justify-between py-4 px-10 leading-8 bg-white bg-opacity-50 font-heading font-medium rounded-3xl'>
											<span>Shipping</span>
											<span className='flex items-center'>
												<span className='mr-3 text-sm'>
													₹
												</span>
												<span className='text-xl'>
													50
												</span>
											</span>
										</div>
									</div>
									<div className='w-full sm:w-1/2 lg:w-4/12 xl:w-3/12 px-3 mb-10 sm:mb-0'>
										<div className='flex items-center justify-between py-4 px-10 leading-8 bg-white font-heading font-medium rounded-3xl'>
											<span>Total</span>
											<span className='flex items-center text-blue-500'>
												<span className='mr-3 text-sm'>
													₹
												</span>
												<span className='text-xl'>
													{
														order.paymentIntent
															.ammount
													}
												</span>
											</span>
										</div>
									</div>
									<div className='w-full sm:w-1/2 lg:max-w-max lg:ml-auto xl:ml-0 px-3'>
										<Link className='block py-5 px-10 w-full text-xl leading-6 font-medium tracking-tighter font-heading text-center text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl'>
											Invoice
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ViewOrder;
