import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import AdminLayout from "./pages/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Enquiries from "./pages/Enquiries";
import Blogs from "./pages/Blogs";
import BlogCategories from "./pages/BlogCategories";
import Orders from "./pages/Orders";
import AllProducts from "./pages/AllProducts";
import ProductCategories from "./pages/ProductCategories";
import AllBrands from "./pages/AllBrands";
import AllColors from "./pages/AllColors";
import Customers from "./pages/Customers";
import AddProduct from "./pages/AddProduct";
import AddBlogPost from "./pages/AddBlogPost";
import AddBlogCategory from "./pages/AddBlogCategory";
import Coupon from "./pages/Coupon";

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/reset-password' element={<ResetPassword />} />
				<Route path='forgot-password' element={<ForgotPassword />} />
				<Route path='/admin' element={<AdminLayout />}>
					<Route index element={<Dashboard />} />
					<Route path='customers' element={<Customers />} />
					<Route path='products' element={<AllProducts />} />
					<Route path='add-product' element={<AddProduct />} />
					<Route path='categories' element={<ProductCategories />} />
					<Route path='brands' element={<AllBrands />} />
					<Route path='coupon' element={<Coupon />} />
					<Route path='colors' element={<AllColors />} />
					<Route path='orders' element={<Orders />} />
					<Route path='enquiries' element={<Enquiries />} />
					<Route path='all-blogs' element={<Blogs />} />
					<Route path='add-blog' element={<AddBlogPost />} />
					<Route
						path='blog-categories'
						element={<BlogCategories />}
					/>
					<Route
						path='add-blog-category'
						element={<AddBlogCategory />}
					/>
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
