import React from "react";

const CustomInput = (props) => {
	const { type, placeholder, i_id, className, name, val, onChng, onBlur } =
		props;
	return (
		<div>
			<input
				type={type}
				className={className}
				id={i_id}
				placeholder={placeholder}
				name={name}
				value={val}
				onChange={onChng}
				onBlur={onBlur}
			/>
		</div>
	);
};

export default CustomInput;
