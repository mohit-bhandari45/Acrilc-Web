"use client";

import Right from "@/components/authcomps/right";
import Left from "@/components/universalcomps/left";
import { loginLabels } from "@/types/types";

const Login = () => {
	return (
		<div className="flex flex-col lg:flex-row w-full min-h-screen font-[Helvetica] justify-center items-center">
			<Left />
			<Right labels={loginLabels} method="Login" />
		</div>
	);
};

export default Login;
