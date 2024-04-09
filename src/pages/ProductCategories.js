import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../features/category/categorySlice";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

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

	const totalCategory = useSelector((state) => state.category.category);
	const data = [];
	for (let i = 0; i < totalCategory.length; i++) {
		if (totalCategory) {
			data.push({
				key: i + 1,
				title: totalCategory[i].title,
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
			<h2 className='text-xl my-4 font-bold'>All Categories</h2>
			<Table columns={columns} dataSource={data} />
		</div>
	);
};

export default ProductCategories;
