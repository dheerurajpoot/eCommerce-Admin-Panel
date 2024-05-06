import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteContact,
	getContacts,
	updateContact,
} from "../features/contact/contactSlice";
import { MdDeleteOutline } from "react-icons/md";
import CustomModel from "../components/CustomModel";
import { IoMdEye } from "react-icons/io";
import { Link } from "react-router-dom";

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

	const allEnquiry = useSelector((state) => state.contact.contacts);
	const totalContacts = [...allEnquiry].reverse();

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
							<select
								name=''
								id=''
								defaultValue={
									totalContacts[i].status
										? totalContacts[i].status
										: "Submitted"
								}
								onChange={(e) =>
									setEnquiryStatus(
										e.target.value,
										totalContacts[i]._id
									)
								}
								className='text-md border px-3 py-1 rounded'>
								<option value='Received'>Received</option>
								<option value='In Progress'>In Progress</option>
								<option value='Solved'>Solved</option>
								<option value='Submitted'>Submitted</option>
							</select>
						</div>
					</>
				),
				action: (
					<>
						<div className='flex'>
							<Link
								to={`/admin/enquiries/${totalContacts[i]?._id}`}
								className='text-xl mx-2 hover:text-green-600'>
								<IoMdEye />
							</Link>
							<button
								onClick={() => showModal(totalContacts[i]._id)}
								className='text-xl border-0 hover:text-green-600 bg-transparent'>
								<MdDeleteOutline />
							</button>
						</div>
					</>
				),
			});
		}
	}

	const setEnquiryStatus = (e, eId) => {
		const data = { id: eId, enqData: e };
		dispatch(updateContact(data));
	};

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
