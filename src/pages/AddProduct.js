import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";

const AddProduct = () => {
	const [desc, setDesc] = useState();

	const handleDesc = (e) => {
		setDesc(e);
	};

	const { Dragger } = Upload;
	const props = {
		name: "file",
		multiple: true,
		action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
		onChange(info) {
			const { status } = info.file;
			if (status !== "uploading") {
				console.log(info.file, info.fileList);
			}
			if (status === "done") {
				message.success(
					`${info.file.name} file uploaded successfully.`
				);
			} else if (status === "error") {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
		onDrop(e) {
			console.log("Dropped files", e.dataTransfer.files);
		},
	};

	return (
		<>
			<section className='flex'>
				<section className='my-6 mx-14 w-[80%]'>
					<div>
						<h2 className='text-3xl font-medium'>Product Name </h2>
						<input
							className='w-full px-2 py-2 my-5 border rounded text-lg'
							type='text'
							placeholder='Enter Product Name'></input>
					</div>

					<div className='my-5'>
						<ReactQuill
							theme='snow'
							className='h-[500px]'
							value={desc}
							placeholder='Write your product description here'
							onChange={(evt) => {
								handleDesc(evt);
							}}
						/>
					</div>
				</section>
				<section className='my-6 mx-14 w-[20%]'>
					<div className='mb-5'>
						<form className='w-full'>
							<label
								htmlFor='categories'
								className='block mb-2 text-lg font-bold text-gray-900'>
								Select a Category
							</label>
							<select
								id='countries'
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '>
								<option>Choose a Category</option>
								<option value='US'>Laptops</option>
								<option value='CA'>Smartphone</option>
								<option value='FR'>Watches</option>
								<option value='DE'>Shoes</option>
							</select>
						</form>
					</div>

					<div className='mb-5'>
						<h2 className='text-lg mb-2 font-medium'>
							Product Images
						</h2>
						<Dragger {...props}>
							<p className='ant-upload-drag-icon'>
								<InboxOutlined />
							</p>
							<p className='ant-upload-text'>
								Click or drag file here to upload
							</p>
						</Dragger>
					</div>
					<div className='mb-5'>
						<h2 className='text-lg font-medium'>Price</h2>
						<input
							className='w-full px-2 py-2 my-2 border rounded'
							type='number'
							placeholder='Enter Price'></input>
					</div>
					<div className='mb-5'>
						<h2 className='text-lg font-medium'>Brand</h2>
						<input
							className='w-full px-2 py-2 my-2 border rounded'
							type='text'
							placeholder='Enter Price'></input>
					</div>
					<div className='mb-5'>
						<h2 className='text-lg font-medium'>Quantity</h2>
						<input
							className='w-full px-2 py-2 my-2 border rounded'
							type='number'
							placeholder='Quantity'></input>
					</div>
					<div className='mb-5'>
						<h2 className='text-lg font-medium'>Color</h2>
						<input
							className='w-[50%] h-10  my-2 border rounded'
							type='color'
							placeholder='Choose Color'></input>
					</div>
					<div>
						<button className='bg-green-700 px-5 py-3 rounded text-white font-bold'>
							Add Product
						</button>
					</div>
				</section>
			</section>
		</>
	);
};

export default AddProduct;
