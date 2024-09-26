import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/auth/authSlice";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	let userSchema = Yup.object().shape({
		email: Yup.string()
			.email("Email should be Valid")
			.required("Email is Required"),
		password: Yup.string().required("Password is Required"),
	});
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: userSchema,
		onSubmit: (values) => {
			dispatch(login(values));
		},
	});
	const { user, isLoading, isSuccess, isError, message } = useSelector(
		(state) => state.auth
	);
	useEffect(() => {
		if (isSuccess) {
			navigate("admin");
			setTimeout(() => {
				window.location.reload();
			}, 1200);
		} else {
			navigate("");
		}
	}, [user, isLoading, isSuccess, isError, dispatch, navigate]);
	return (
		<>
			<section className='login'>
				<div className='flex flex-col items-center justify-center mt-32'>
					<Link className='flex items-center mb-6 text-2xl font-semibold text-gray-900'>
						<img
							className='w-64 mr-2 rounded-xl'
							src='images/drstore-bg-logo.png'
							alt='logo'
						/>
					</Link>
					<div className='w-full bg-white rounded-lg shadowr md:mt-0 sm:max-w-md xl:p-0'>
						<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
							<h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
								Log in to Lesshopy admin
							</h1>
							<div>
								{message.message === "Rejected"
									? "You are not an Admin"
									: ""}
							</div>
							<form
								className='space-y-4 md:space-y-6'
								action='#'
								onSubmit={formik.handleSubmit}>
								<div>
									<label
										htmlFor='email'
										className='block mb-2 text-sm font-medium text-gray-900'>
										Your email
									</label>

									<CustomInput
										type='email'
										name='email'
										className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
										id='email'
										placeholder='lesshopy@gmail.com'
										value={formik.values.email}
										onChng={formik.handleChange("email")}
									/>
									<div className='error'>
										{formik.touched.email &&
										formik.errors.email ? (
											<div>{formik.errors.email}</div>
										) : null}
									</div>
								</div>
								<div>
									<label
										htmlFor='password'
										className='block mb-2 text-sm font-medium text-gray-900'>
										Password
									</label>
									<CustomInput
										type='password'
										name='password'
										id='password'
										placeholder='••••••••'
										className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
										value={formik.values.password}
										onChng={formik.handleChange("password")}
									/>
									<div className='error'>
										{formik.touched.password &&
										formik.errors.password ? (
											<div>{formik.errors.password}</div>
										) : null}
									</div>
								</div>
								<div className='flex items-center justify-between'>
									<div className='flex items-start'>
										<div className='flex items-center h-5'>
											<input
												id='remember'
												aria-describedby='remember'
												type='checkbox'
												className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300'
												required=''
											/>
										</div>
										<div className='ml-3 text-sm'>
											<label
												htmlFor='remember'
												className='text-gray-500'>
												Remember me
											</label>
										</div>
									</div>
									<Link
										to={"/forgot-password"}
										className='text-sm font-medium text-primary-600 hover:underline'>
										Forgot password?
									</Link>
								</div>
								<button
									type='submit'
									className='w-full text-white bg-[#FF504E] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
									{isLoading ? "Processing..." : "Log in"}
								</button>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Login;
