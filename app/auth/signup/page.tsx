"use client";

import Right from "@/components/authcomps/right";
import Left from "@/components/universalcomps/left";
import { signupLabels } from "@/types/types";

const Signup = () => {
	return (
		<div className="flex flex-col lg:flex-row w-full min-h-screen font-[Helvetica] justify-center items-center">
			<Left />
			<Right labels={signupLabels} method="Sign Up" />
		</div>
	);
};

export default Signup;
