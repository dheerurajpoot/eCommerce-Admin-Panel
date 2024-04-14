import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
	createColor,
	deleteColor,
	getColors,
} from "../features/color/colorSlice";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import CustomModel from "../components/CustomModel";

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
let userSchema = Yup.object().shape({
	title: Yup.string().required("Color is Required"),
});
const AllColors = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getColors());
	}, [dispatch]);

	const formik = useFormik({
		initialValues: {
			title: "",
		},
		validationSchema: userSchema,
		onSubmit: (values) => {
			dispatch(createColor(values));
			formik.resetForm();
			setTimeout(() => {
				window.location.reload();
			}, 200);
		},
	});

	const totalColors = useSelector((state) => state.color.colors);
	const newState = useSelector((state) => state.color);
	const { isSuccess, isError, isLoading, createdColor } = newState;

	useEffect(() => {
		if (isSuccess && createdColor) {
			toast.success("Color Added Successfully!");
		}
		if (isError) {
			toast.error("Something Went Wrong!");
		}
	}, [isSuccess, isError, isLoading, createdColor]);

	const data = [];
	for (let i = 0; i < totalColors.length; i++) {
		if (totalColors) {
			data.push({
				key: i + 1,
				title: totalColors[i].title,
				action: (
					<>
						<div className='flex gap-3'>
							<Link className='text-lg'>
								<FaEdit />
							</Link>
							<button
								onClick={() => showModal(totalColors[i]._id)}
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
	const [colorId, setColorId] = useState("");
	const showModal = (e) => {
		setOpen(true);
		setColorId(e);
	};

	const hideModal = () => {
		setOpen(false);
	};

	const deleteColorData = (e) => {
		setOpen(false);
		dispatch(deleteColor(e));

		setTimeout(() => {
			dispatch(getColors());
		}, 200);
	};
	return (
		<>
			<section className='flex gap-5'>
				<div className='w-[30%] pl-8'>
					<h2 className='text-xl my-4 font-bold'>Add Colors</h2>

					<form
						action='#'
						onSubmit={formik.handleSubmit}
						className='flex items-center gap-7'>
						<input
							className='w-[30%] h-10 border rounded text-lg'
							type='color'
							placeholder='Enter Color'
							name='title'
							value={formik.values.title}
							onChange={formik.handleChange("title")}
							onBlur={formik.handleBlur("title")}
						/>
						<button className='bg-green-700 px-5 py-3 rounded text-white font-bold'>
							Add Color
						</button>
					</form>
					<div className='error'>
						{formik.touched.title && formik.errors.title}
					</div>
				</div>
				<div className='w-[65%]'>
					<h2 className='text-xl my-4 font-bold'>Colors</h2>
					<Table columns={columns} dataSource={data} />
				</div>
				<CustomModel
					hideModal={hideModal}
					open={open}
					btnAction={() => {
						deleteColorData(colorId);
					}}
					title='Are yo sure, do you want to delete this Color?'
				/>
			</section>
		</>
	);
};

export default AllColors;
