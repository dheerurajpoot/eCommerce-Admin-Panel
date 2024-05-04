import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ children }) => {
	const getTokenFromLocaleStorate = JSON.parse(localStorage.getItem("user"));
	return getTokenFromLocaleStorate?.token !== undefined ? (
		children
	) : (
		<Navigate to={"/"} replace={true} />
	);
};
