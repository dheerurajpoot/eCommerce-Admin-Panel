import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getContact, updateContact } from "../features/contact/contactSlice";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const ViewEnquiry = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const enqID = location.pathname.split("/")[3];
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getContact(enqID));
	}, [dispatch, enqID]);

	const enquiryState = useSelector((state) => state.contact);
	const {
		enquiryName,
		enquiryMobile,
		enquiryEmail,
		enquiryComment,
		enquiryStatus,
	} = enquiryState;

	const goBack = () => {
		navigate(-1);
	};
	const setEnquiryStatus = (e, eId) => {
		const data = { id: eId, enqData: e };
		dispatch(updateContact(data));
		setTimeout(() => {
			dispatch(getContact(enqID));
		}, 100);
	};
	return (
		<>
			<div>
				<div className='flex justify-between'>
					<h2 className='text-xl m-4 font-bold'>View Enquiry</h2>
					<button
						onClick={goBack}
						className='rounded flex items-center justify-center border px-3 text-lg'>
						<IoMdArrowRoundBack /> Back To Enquiries
					</button>
				</div>
				<div className='mt-4 mx-7'>
					<div className='border-t border-gray-200 px-4 py-5 sm:p-0'>
						<dl className='sm:divide-y sm:divide-gray-200'>
							<div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
								<dt className='text-sm font-medium text-gray-500'>
									Full name
								</dt>
								<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
									{enquiryName}
								</dd>
							</div>
							<div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
								<dt className='text-sm font-medium text-gray-500'>
									Email address
								</dt>
								<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
									<Link to={`mailto:${enquiryEmail}`}>
										{enquiryEmail}
									</Link>
								</dd>
							</div>
							<div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
								<dt className='text-sm font-medium text-gray-500'>
									Phone number
								</dt>
								<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
									<Link to={`tel:+91${enquiryMobile}`}>
										{enquiryMobile}
									</Link>
								</dd>
							</div>
							<div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
								<dt className='text-sm font-medium text-gray-500'>
									Enquiry Message
								</dt>
								<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
									{enquiryComment}
								</dd>
							</div>
							<div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
								<dt className='text-sm font-medium text-gray-500'>
									Status
								</dt>
								<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
									{enquiryStatus}
								</dd>
							</div>
							<div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
								<dt className='text-sm font-medium text-gray-500'>
									Change Status
								</dt>
								<dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
									<div>
										<select
											name=''
											id=''
											defaultValue={
												enquiryState
													? enquiryState
													: "Submitted"
											}
											onChange={(e) =>
												setEnquiryStatus(
													e.target.value,
													enqID
												)
											}
											className='text-md border px-3 py-1 rounded'>
											<option value='Received'>
												Received
											</option>
											<option value='In Progress'>
												In Progress
											</option>
											<option value='Solved'>
												Solved
											</option>
											<option value='Submitted'>
												Submitted
											</option>
										</select>
									</div>
								</dd>
							</div>
						</dl>
					</div>
				</div>
			</div>
		</>
	);
};

export default ViewEnquiry;
