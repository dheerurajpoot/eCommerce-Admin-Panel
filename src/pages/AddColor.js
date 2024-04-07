import React from "react";

const AddColor = () => {
	return (
		<>
			<section className='mx-10'>
				<div>
					<h2 className='text-2xl font-medium'>Add Color </h2>
					<input
						className='w-[10%] h-14 my-5 border rounded text-lg'
						type='color'
						placeholder='Enter Color'></input>
				</div>
				<div className='my-2'>
					<button className='bg-green-700 px-5 py-3 rounded text-white font-bold'>
						Add Color
					</button>
				</div>
			</section>
		</>
	);
};

export default AddColor;
