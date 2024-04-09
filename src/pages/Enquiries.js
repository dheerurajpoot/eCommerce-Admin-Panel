import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "../features/contact/contactSlice";
import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";

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
		sorter: (a, b) => a.email.length - b.email.length,
	},
	{
		title: "Mobile",
		dataIndex: "mobile",
	},
	{
		title: "Comment",
		dataIndex: "comment",
	},
	{
		title: "Status",
		dataIndex: "status",
		sorter: (a, b) => a.status.length - b.status.length,
	},
	{
		title: "Date",
		dataIndex: "createdAt",
	},
	{
		title: "Action",
		dataIndex: "action",
	},
];

const Enquiries = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getContacts());
	}, [dispatch]);

	const totalContacts = useSelector((state) => state.contact.contacts);
	const data = [];
	for (let i = 0; i < totalContacts.length; i++) {
		if (totalContacts) {
			data.push({
				key: i + 1,
				name: totalContacts[i].name,
				email: totalContacts[i].email,
				mobile: totalContacts[i].mobile,
				comment: totalContacts[i].comment,
				createdAt: new Date(
					totalContacts[i].createdAt
				).toLocaleString(),
				status: (
					<>
						<div>
							<select name='' id='' className='text-md'>
								<option value=''>Set Status</option>
								<option value=''>Received</option>
								<option value=''>Solved</option>
								<option value=''>Submitted</option>
							</select>
						</div>
					</>
				),
				action: (
					<>
						<div>
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
			<h2 className='text-xl my-4 font-bold'>Enquiries</h2>
			<Table columns={columns} dataSource={data} />
		</div>
	);
};

export default Enquiries;
