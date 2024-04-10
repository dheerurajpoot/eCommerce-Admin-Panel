import React, { useEffect } from "react";
import { Table } from "antd";
import { getBrands } from "../features/brands/brandSlice";
import { useDispatch, useSelector } from "react-redux";
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
					<h2 className='text-xl my-4 font-bold'>Add Brand</h2>

					<div className='flex items-center gap-7'>
						<input
							className='w-[50%] px-3 py-3 border rounded text-sm'
							type='text'
							placeholder='Brand Name'
						/>
						<button className='bg-green-700 px-5  py-3 rounded text-white font-bold'>
							Add Brand
						</button>
					</div>
				</div>
				<div className='w-[65%]'>
					<h2 className='text-xl my-4 font-bold'>Brands</h2>
					<Table columns={columns} dataSource={data} />
				</div>
			</section>
		</>
	);
};

export default AllBrands;
