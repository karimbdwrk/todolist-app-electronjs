import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const HomePage = () => {
	const { user } = useAuthContext();

	return (
		<>
			<h1>Home Page</h1>
			<h3>Hello {user?.username}</h3>
			{user && <Link to='/todolist'>TodoList</Link>}
		</>
	);
};

export default HomePage;
