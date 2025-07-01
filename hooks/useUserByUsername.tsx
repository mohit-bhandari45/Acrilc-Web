import api, { GET_USER_PROFILE } from "@/apis/api";
import { IUser } from "@/types/types";
import { useEffect, useState } from "react";

interface Params {
	username: string;
	skip?: boolean;
}

const useUserByUsername = ({ username, skip = false }: Params) => {
	const [user, setUser] = useState<IUser | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (skip) {
			setLoading(false);
			return;
		}

		if (!username) {
			setLoading(false);
			return;
		}

		async function getUser() {
			setLoading(true);
			try {
				const response = await api.get(`${GET_USER_PROFILE}/${username}`);
				if (response.status === 200) setUser(response.data.data);
			} catch (error: unknown) {
				console.log(error);
				setUser(null);
			} finally {
				setLoading(false);
			}
		}

		getUser();
	}, [username, skip]);

	return { user, loading };
};

export default useUserByUsername;
