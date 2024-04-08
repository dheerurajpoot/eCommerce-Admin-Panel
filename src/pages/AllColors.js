import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getColors } from "../features/color/colorSlice";

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
const AllColors = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getColors());
	}, [dispatch]);

	const totalColors = useSelector((state) => state.color.colors);
	const data = [];
	for (let i = 0; i < totalColors.length; i++) {
		if (totalColors) {
			data.push({
				key: i + 1,
				title: totalColors[i].title,
			});
		}
	}
	return (
		<div className='my-5'>
			<h2 className='text-xl my-4 font-bold'>Colors</h2>
			<Table columns={columns} dataSource={data} />
		</div>
	);
};

export default AllColors;
