import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/customers/customerSlice";

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
		title: "Email",
		dataIndex: "email",
	},
	{
		title: "Mobile",
		dataIndex: "mobile",
	},
	{
		title: "Role",
		dataIndex: "role",
	},
	{
		title: "Address",
		dataIndex: "address",
	},
];

const Customers = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	const allCustomers = useSelector((state) => state.customer.customers);
	const data = [];
	for (let i = 0; i < allCustomers.length; i++) {
		if (allCustomers) {
			data.push({
				key: i + 1,
				name: allCustomers[i].name,
				email: allCustomers[i].email,
				mobile: allCustomers[i].mobile,
				role: allCustomers[i].role,
				address: allCustomers[i].address,
			});
		}
	}

	return (
		<div className='my-5'>
			<h2 className='text-xl my-4 font-bold'>Customers</h2>
			<Table columns={columns} dataSource={data} />
		</div>
	);
};

export default Customers;
