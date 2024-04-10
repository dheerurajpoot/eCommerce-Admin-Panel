import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/products/productSlice";
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
		title: "Price",
		dataIndex: "price",
		sorter: (a, b) => a.price.length - b.price.length,
	},
	{
		title: "Category",
		dataIndex: "category",
		sorter: (a, b) => a.category.length - b.category.length,
	},
	{
		title: "Brand",
		dataIndex: "brand",
		sorter: (a, b) => a.brand.length - b.brand.length,
	},
	{
		title: "Color",
		dataIndex: "color",
		sorter: (a, b) => a.color.length - b.color.length,
	},
	{
		title: "Quantity",
		dataIndex: "quantity",
	},
	{
		title: "Sold",
		dataIndex: "sold",
	},
	{
		title: "Ratings",
		dataIndex: "totalRating",
		sorter: (a, b) => a.totalRating.length - b.totalRating.length,
	},
	{
		title: "Action",
		dataIndex: "action",
	},
];

const AllProducts = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);

	const totalProduct = useSelector((state) => state.product.products);
	const totalProducts = [...totalProduct].reverse();
	const data = [];
	for (let i = 0; i < totalProducts.length; i++) {
		if (totalProducts) {
			data.push({
				key: i + 1,
				title: totalProducts[i].title,
				description: totalProducts[i].description,
				price: `₹ ${totalProducts[i].price}`,
				brand: totalProducts[i].brand,
				color: totalProducts[i].color.map((cVal, index) => {
					return <p key={index}>{cVal}</p>;
				}),
				category: totalProducts[i].category,
				quantity: totalProducts[i].quantity,
				sold: totalProducts[i].sold,
				totalRating: totalProducts[i].totalRating,
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
			<h2 className='text-xl my-4 font-bold'>All Products</h2>
			<Table columns={columns} dataSource={data} />
		</div>
	);
};

export default AllProducts;
