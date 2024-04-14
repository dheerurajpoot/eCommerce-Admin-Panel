import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import {
	createCoupon,
	deleteCoupon,
	getCoupons,
} from "../features/coupon/couponSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import CustomModel from "../components/CustomModel";

let userSchema = Yup.object().shape({
	name: Yup.string().required("Coupon Name is Required"),
	expiry: Yup.date().required("Expiry Date is Required"),
	discount: Yup.number().required("Discount is Required"),
});
const columns = [
	{
		title: "S No.",
		dataIndex: "key",
	},
	{
		title: "Name",
		dataIndex: "name",
		sorter: (a, b) => a.name.length - b.name.length,
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

	const formik = useFormik({
		initialValues: {
			name: "",
			expiry: "",
			discount: "",
		},
		validationSchema: userSchema,
		onSubmit: (values) => {
			dispatch(createCoupon(values));
			formik.resetForm();
			setTimeout(() => {
				dispatch(getCoupons());
			}, 200);
		},
	});

	const totalCoupons = useSelector((state) => state.coupon.coupons);
	const newState = useSelector((state) => state.coupon);
	const { isSuccess, isError, isLoading, createdCoupon } = newState;

	useEffect(() => {
		if (isSuccess && createdCoupon) {
			toast.success("Coupon Added Successfully!");
		}
		if (isError) {
			toast.error("Something Went Wrong!");
		}
	}, [isSuccess, isError, isLoading, createdCoupon]);

	const data = [];
	for (let i = 0; i < totalCoupons.length; i++) {
		if (totalCoupons) {
			data.push({
				key: i + 1,
				name: totalCoupons[i].name,
				expiry: new Date(totalCoupons[i].expiry).toLocaleString(),
				discount: `${totalCoupons[i].discount}%`,
				action: (
					<>
						<div className='flex gap-3'>
							<Link className='text-lg'>
								<FaEdit />
							</Link>
							<button
								onClick={() => showModal(totalCoupons[i]._id)}
								className='text-xl border-0 hover:text-green-600 bg-transparent'>
								<MdDeleteOutline />
							</button>
						</div>
					</>
				),
			});
		}
	}

	const [open, setOpen] = useState(false);
	const [couponId, setCouponId] = useState("");
	const showModal = (e) => {
		setOpen(true);
		setCouponId(e);
	};

	const hideModal = () => {
		setOpen(false);
	};

	const deleteCouponData = (e) => {
		setOpen(false);
		dispatch(deleteCoupon(e));

		setTimeout(() => {
			dispatch(getCoupons());
		}, 200);
	};
	return (
		<>
			<section className='flex gap-5'>
				<form
					action='#'
					onSubmit={formik.handleSubmit}
					className='w-[30%] pl-8'>
					<h2 className='text-xl my-4 font-bold'>Add Coupon</h2>

					<div className='flex items-center flex-col gap-2'>
						<input
							className='w-[50%] px-3 py-3 border rounded text-sm'
							type='text'
							placeholder='Coupon Name'
							name='name'
							value={formik.values.name}
							onChange={formik.handleChange("name")}
							onBlur={formik.handleBlur("name")}
						/>
						<div className='error'>
							{formik.touched.name && formik.errors.name}
						</div>
						<input
							className='w-[50%] px-3 py-3 border rounded text-sm'
							type='date'
							placeholder='Expiry Date'
							name='expiry'
							value={formik.values.title}
							onChange={formik.handleChange("expiry")}
							onBlur={formik.handleBlur("expiry")}
						/>
						<div className='error'>
							{formik.touched.expiry && formik.errors.expiry}
						</div>
						<input
							className='w-[50%] px-3 py-3 border rounded text-sm'
							type='number'
							placeholder='Discount'
							name='discount'
							value={formik.values.title}
							onChange={formik.handleChange("discount")}
							onBlur={formik.handleBlur("discount")}
						/>
						<div className='error'>
							{formik.touched.discount && formik.errors.discount}
						</div>
						<button
							type='submit'
							className='bg-green-700 px-5  py-3 rounded text-white font-bold'>
							Add Coupon
						</button>
					</div>
				</form>
				<div className='w-[65%]'>
					<h2 className='text-xl my-4 font-bold'>Coupons</h2>
					<Table columns={columns} dataSource={data} />
				</div>
				<CustomModel
					hideModal={hideModal}
					open={open}
					btnAction={() => {
						deleteCouponData(couponId);
					}}
					title='Are yo sure, do you want to delete this Coupon?'
				/>
			</section>
		</>
	);
};

export default Coupon;
