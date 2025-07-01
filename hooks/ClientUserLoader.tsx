"use client";

import { fetchOwnProfile } from "@/store/features/userSlice";
import { useAppDispatch } from "@/store/hooks";
import { useEffect } from "react";

export default function ClientUserLoader() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchOwnProfile());
    }, [dispatch]);

    return null;
}