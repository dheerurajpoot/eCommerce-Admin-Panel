import React, { useEffect } from "react";
import { Table } from "antd";
import { getBrands } from "../features/brands/brandSlice";
import { useDispatch, useSelector } from "react-redux";

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
];
const AllBrands = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getBrands());
	}, [dispatch]);

	const totalBrands = useSelector((state) => state.brand.brands);
	const data = [];
	for (let i = 0; i < totalBrands.length; i++) {
		if (totalBrands) {
			data.push({
				key: i + 1,
				title: totalBrands[i].title,
			});
		}
	}

	return (
		<div className='my-5'>
			<h2 className='text-xl my-4 font-bold'>Brands</h2>
			<Table columns={columns} dataSource={data} />
		</div>
	);
};

export default AllBrands;
