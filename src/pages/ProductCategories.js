import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
	createCategory,
	deleteCategory,
	getCategory,
} from "../features/category/categorySlice";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import CustomModel from "../components/CustomModel";

let userSchema = Yup.object().shape({
	title: Yup.string().required("Category Name is Required"),
});

const columns = [
	{
		title: "S No.",
		dataIndex: "key",
	},
	{
		title: "Name",
		dataIndex: "title",
		sorter: (a, b) => a.title.length - b.title.length,
	},
	{
		title: "Action",
		dataIndex: "action",
	},
];

const ProductCategories = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCategory());
	}, [dispatch]);

	const formik = useFormik({
		initialValues: {
			title: "",
		},
		validationSchema: userSchema,
		onSubmit: (values) => {
			dispatch(createCategory(values));
			formik.resetForm();
			setTimeout(() => {
				dispatch(getCategory());
			}, 200);
		},
	});

	const totalCategory = useSelector((state) => state.category.category);
	const newState = useSelector((state) => state.category);
	const { isSuccess, isError, isLoading, createdCategory } = newState;

	useEffect(() => {
		if (isSuccess && createdCategory) {
			toast.success("Category Added Successfully!");
		}
		if (isError) {
			toast.error("Something Went Wrong!");
		}
	}, [isSuccess, isError, isLoading, createdCategory]);

	const data = [];
	for (let i = 0; i < totalCategory.length; i++) {
		if (totalCategory) {
			data.push({
				key: i + 1,
				title: totalCategory[i].title,
				action: (
					<>
						<div className='flex gap-3'>
							<Link className='text-lg hover:text-green-600'>
								<FaEdit />
							</Link>
							<button
								onClick={() => showModal(totalCategory[i]._id)}
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
	const [categoryId, setCategoryId] = useState("");
	const showModal = (e) => {
		setOpen(true);
		setCategoryId(e);
	};

	const hideModal = () => {
		setOpen(false);
	};

	const deleteCategoryData = (e) => {
		setOpen(false);
		dispatch(deleteCategory(e));

		setTimeout(() => {
			dispatch(getCategory());
		}, 200);
	};
	return (
		<>
			<section className='flex gap-5'>
				<div className='w-[30%] pl-8'>
					<h2 className='text-xl my-4 font-bold'>Add Category</h2>

					<form
						action='#'
						onSubmit={formik.handleSubmit}
						className='flex items-center gap-7'>
						<input
							className='w-[50%] px-3 py-3 border rounded text-sm'
							type='text'
							placeholder='Category Name'
							name='title'
							value={formik.values.title}
							onChange={formik.handleChange("title")}
							onBlur={formik.handleBlur("title")}
						/>
						<button
							type='submit'
							className='bg-green-700 px-5  py-3 rounded text-white font-bold'>
							Add Category
						</button>
					</form>
					<div className='error'>
						{formik.touched.title && formik.errors.title}
					</div>
				</div>
				<div className='w-[65%]'>
					<h2 className='text-xl my-4 font-bold'>All Categories</h2>
					<Table columns={columns} dataSource={data} />
				</div>
				<CustomModel
					hideModal={hideModal}
					open={open}
					btnAction={() => {
						deleteCategoryData(categoryId);
					}}
					title='Are yo sure, do you want to delete this Category?'
				/>
			</section>
		</>
	);
};

export default ProductCategories;
