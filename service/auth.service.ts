import api, { GET_OWN_PROFILE } from "@/apis/api"
import { IUser } from "@/types/types";

export const getUser = async (): Promise<IUser | null> => {
    try {
        const { data } = await api.get(GET_OWN_PROFILE);
        return data.data;
    } catch (err) {
        return null;
    }
}