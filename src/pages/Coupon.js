import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { getCoupons } from "../features/coupon/couponSlice";

const columns = [
	{
		title: "S No.",
		dataIndex: "key",
	},
	{
		title: "Name",
		dataIndex: "name",
		sorter: (a, b) => a.title.length - b.title.length,
	},
	{
		title: "Expiry",
		dataIndex: "expiry",
		sorter: (a, b) => a.expiry.length - b.expiry.length,
	},
	{
		title: "Discount",
		dataIndex: "discount",
		sorter: (a, b) => a.discount.length - b.discount.length,
	},
	{
		title: "Action",
		dataIndex: "action",
	},
];
const Coupon = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCoupons());
	}, [dispatch]);

	const totalCoupons = useSelector((state) => state.coupon.coupons);
	const data = [];
	for (let i = 0; i < totalCoupons.length; i++) {
		if (totalCoupons) {
			data.push({
				key: i + 1,
				name: totalCoupons[i].name,
				expiry: new Date(totalCoupons[i].expiry).toDateString(),
				discount: `${totalCoupons[i].discount}%`,
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
			<section className='flex gap-5'>
				<div className='w-[30%] pl-8'>
					<h2 className='text-xl my-4 font-bold'>Add Coupon</h2>

					<div className='flex items-center gap-7'>
						<input
							className='w-[50%] px-3 py-3 border rounded text-sm'
							type='text'
							placeholder='Brand Name'
						/>
						<button className='bg-green-700 px-5  py-3 rounded text-white font-bold'>
							Add Coupon
						</button>
					</div>
				</div>
				<div className='w-[65%]'>
					<h2 className='text-xl my-4 font-bold'>Coupons</h2>
					<Table columns={columns} dataSource={data} />
				</div>
			</section>
		</>
	);
};

export default Coupon;
