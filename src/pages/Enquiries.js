import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact, getContacts } from "../features/contact/contactSlice";
import { MdDeleteOutline } from "react-icons/md";
import CustomModel from "../components/CustomModel";

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
							<button
								onClick={() => showModal(totalContacts[i]._id)}
								className='text-xl border-0 bg-transparent'>
								<MdDeleteOutline />
							</button>
						</div>
					</>
				),
			});
		}
	}

	const [open, setOpen] = useState(false);
	const [contactId, setContactId] = useState("");
	const showModal = (e) => {
		setOpen(true);
		setContactId(e);
	};

	const hideModal = () => {
		setOpen(false);
	};

	const deleteContactData = (e) => {
		setOpen(false);
		dispatch(deleteContact(e));

		setTimeout(() => {
			dispatch(getContacts());
		}, 200);
	};
	return (
		<>
			<div className='my-5'>
				<h2 className='text-xl my-4 font-bold'>Enquiries</h2>
				<Table columns={columns} dataSource={data} />
			</div>
			<CustomModel
				hideModal={hideModal}
				open={open}
				btnAction={() => {
					deleteContactData(contactId);
				}}
				title='Are yo sure, do you want to delete this Enquiry?'
			/>
		</>
	);
};

export default Enquiries;
