import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../features/category/categorySlice";

const columns = [
	{
		title: "S No.",
		dataIndex: "key",
	},
	{
		title: "Name",
		dataIndex: "title",
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
