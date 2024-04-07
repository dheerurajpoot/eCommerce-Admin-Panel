import React from "react";

const AddCategory = () => {
	return (
		<>
			<section className='mx-10'>
				<div>
					<h2 className='text-2xl font-medium'>
						Add Product Category{" "}
					</h2>
					<input
						className='w-[40%] px-2 py-2 my-5 border rounded text-lg'
						type='text'
						placeholder='Enter Category Name'></input>
				</div>
				<div className='my-2'>
					<button className='bg-green-700 px-5 py-3 rounded text-white font-bold'>
						Add Product Category
					</button>
				</div>
			</section>
		</>
	);
};

export default AddCategory;
