"use client";

import { getUser } from "@/service/auth.service";
import { setUser } from "@/store/features/userSlice";
import { useAppDispatch } from "@/store/hooks";
import { IUser } from "@/types/types";
import { useEffect } from "react";

export default function ClientUserLoader() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        getUser()
        .then((user: IUser | null) => {
            if (user) dispatch(setUser(user));
        })
    }, [dispatch]);
    return null;
}