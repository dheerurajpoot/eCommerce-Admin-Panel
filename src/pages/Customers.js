import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../features/customers/customerSlice";
import CustomModel from "../components/CustomModel";
import { MdDeleteOutline } from "react-icons/md";

const columns = [
	{
		title: "S No.",
		dataIndex: "key",
	},
	{
		title: "User Id",
		dataIndex: "id",
	},
	{
		title: "Name",
		dataIndex: "name",
		sorter: (a, b) => a.name?.length - b.name?.length,
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
		title: "Registered At",
		dataIndex: "registerDate",
	},
	{
		title: "Action",
		dataIndex: "action",
	},
];

const Customers = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	const Customers = useSelector((state) => state?.customer?.customers);
	const allCustomers = [...Customers].reverse();

	const data = [];
	for (let i = 0; i < allCustomers?.length; i++) {
		if (allCustomers) {
			data.push({
				key: i + 1,
				id: allCustomers[i]?._id,
				name: allCustomers[i]?.name,
				email: allCustomers[i]?.email,
				mobile: allCustomers[i]?.mobile,
				role: allCustomers[i]?.role,
				registerDate: new Date(
					allCustomers[i]?.createdAt
				).toDateString(),
				action: (
					<>
						<div className='flex gap-3'>
							<button
								onClick={() => showModal(allCustomers[i]?._id)}
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
	const [customerId, setCustomerId] = useState("");
	const showModal = (e) => {
		setOpen(true);
		setCustomerId(e);
	};

	const hideModal = () => {
		setOpen(false);
	};

	const deleteCustomerData = (e) => {
		setOpen(false);
		dispatch(deleteUser(e));

		setTimeout(() => {
			dispatch(getUsers());
		}, 200);
	};
	return (
		<>
			<div className='my-5'>
				<h2 className='text-xl my-4 font-bold'>Customers</h2>
				<Table columns={columns} dataSource={data} />
			</div>
			<CustomModel
				hideModal={hideModal}
				open={open}
				btnAction={() => {
					deleteCustomerData(customerId);
				}}
				title='Are yo sure, do you want to delete this Customer?'
			/>
		</>
	);
};

export default Customers;
