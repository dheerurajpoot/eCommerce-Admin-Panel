import React, { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { SiBrandfolder } from "react-icons/si";
import { IoIosColorFill } from "react-icons/io";
import { RiListOrdered2 } from "react-icons/ri";
import { MdArticle } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdLiveHelp } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";
import { BsBoxArrowInLeft } from "react-icons/bs";
import { BsBoxArrowInRight } from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";
import { Layout, Menu, Button, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { Header, Sider, Content } = Layout;
const AdminLayout = () => {
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();
	const navigate = useNavigate();
	return (
		<Layout>
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<div className='logo'>
					{/* <img
						className='lg-logo'
						src='./images/drstore.png'
						alt='DR Store logo'
					/> */}
					<h2 className='lg-logo text-white text-3xl font-bold text-center'>
						DR Store
					</h2>
					{/* <img
						className='sm-logo'
						src='images/drstoreicon.png'
						alt='DR Store logo'
					/> */}
					<h2 className='sm-logo text-white text-3xl font-bold text-center'>
						DR
					</h2>
				</div>
				<Menu
					theme='dark'
					mode='inline'
					defaultSelectedKeys={[""]}
					onClick={({ key }) => {
						if (key === "signout") {
						} else {
							navigate(key);
						}
					}}
					items={[
						{
							key: "",
							icon: <MdDashboard />,
							label: "Dashboard",
						},
						{
							key: "customers",
							icon: <FaUsers />,
							label: "Customers",
						},
						{
							key: "catalog",
							icon: <FaCartPlus />,
							label: "Catalog",
							children: [
								{
									key: "add-product",
									icon: <FaCartPlus />,
									label: "Add Products",
								},
								{
									key: "all-products",
									icon: <FaCartPlus />,
									label: "All Products",
								},
								{
									key: "add-category",
									icon: <MdCategory />,
									label: "Add Category",
								},
								{
									key: "all-category",
									icon: <MdCategory />,
									label: "All Category",
								},
								{
									key: "add-brands",
									icon: <SiBrandfolder />,
									label: "Add Brands",
								},
								{
									key: "all-brands",
									icon: <SiBrandfolder />,
									label: "All Brands",
								},
								{
									key: "add-colors",
									icon: <IoIosColorFill />,
									label: "Add Colors",
								},
								{
									key: "all-colors",
									icon: <IoIosColorFill />,
									label: "All Colors",
								},
							],
						},
						{
							key: "orders",
							icon: <RiListOrdered2 />,
							label: "Orders",
						},
						{
							key: "Blog",
							icon: <MdArticle />,
							label: "Blog",
							children: [
								{
									key: "add-blog",
									icon: <MdArticle />,
									label: "Add Blog Post",
								},
								{
									key: "all-blogs",
									icon: <MdArticle />,
									label: "All Blogs",
								},
								{
									key: "add-blog-category",
									icon: <BiSolidCategoryAlt />,
									label: "Add Category",
								},
								{
									key: "blog-categories",
									icon: <BiSolidCategoryAlt />,
									label: "All Categories",
								},
							],
						},
						{
							key: "enquiries",
							icon: <MdLiveHelp />,
							label: "Enquiries",
						},
					]}
				/>
			</Sider>
			<Layout>
				<Header
					className='flex justify-between'
					style={{
						padding: 0,
						background: colorBgContainer,
					}}>
					<Button
						type='text'
						icon={
							collapsed ? (
								<BsBoxArrowInRight />
							) : (
								<BsBoxArrowInLeft />
							)
						}
						onClick={() => setCollapsed(!collapsed)}
						style={{
							fontSize: "22px",
							width: 64,
							height: 64,
						}}
					/>
					<div className='pr-8 flex gap-5 justify-center items-center'>
						<div className='relative mx-3 cursor-pointer'>
							<span className='notification'>2</span>
							<IoNotifications className='text-2xl' />
						</div>
						<div className='w-12 border bg-blue-950 rounded-full p-1'>
							{/* <img
								className='w-[90%]'
								src='./images/drstoreicon.png'
								alt='user profile'
							/> */}
							<h2 className='text-2xl text-white font-bold text-center'>
								DR
							</h2>
						</div>

						<div className='dropdown'>
							<button className='dropbtn py-2'>
								<p className='text-lg font-semibold'>
									Dheeru Rajpoot <br />
									<span className='text-sm font-light'>
										rajpootdheeru90@gmail.com
									</span>
								</p>
							</button>
							<div className='dropdown-content font-semibold'>
								<Link to={"/"} className='drop-items'>
									Profile
								</Link>
								<Link
									to={"/sign-out"}
									className='drop-items border-t-2'>
									Sign Out
								</Link>
							</div>
						</div>
					</div>
				</Header>
				<Content
					style={{
						margin: "24px 16px",
						padding: 24,
						minHeight: 280,
						background: colorBgContainer,
						borderRadius: borderRadiusLG,
					}}>
					<ToastContainer
						position='top-right'
						autoClose={250}
						hideProgressBar={false}
						newestOnTop={true}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme='light'
					/>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
};
export default AdminLayout;
