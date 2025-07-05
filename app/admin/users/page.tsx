"use client";

import api, { BASE_URL } from "@/apis/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { IUser } from "@/types/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import UsersTable from "@/components/admincomps/users-table";
import { columns } from "@/components/admincomps/users-columns";

interface AllUsersResponse {
    success: boolean;
    count: number;
    resultPerPage: number;
    filteredUsersCount: number;
    users: IUser[];
}

export default function AdminUsersPage() {

    const [users, setUsers] = useState<IUser[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const page = searchParams.get("page");
    const keyword = searchParams.get("keyword");
    const role = searchParams.get("role");
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState({
        keyword: "",
        role: "",
    });
    const [counts, setCounts] = useState({
        currentPage: 1,
        resultPerPage: 1,
        filteredUsers: 1,
        totalUsers: 1
    });

    const fetchUsers = async (url: string) => {
        try {
            const { data }: { data: AllUsersResponse } = await api.get(url, { withCredentials: true });
            setUsers(data.users);
            setCounts(prev => ({
                ...prev,
                resultPerPage: data.resultPerPage,
                filteredUsers: data.filteredUsersCount,
                totalUsers: data.count
            }));
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!!");
            setUsers([]);
        }
    }

    useEffect(() => {
        setFilter({ keyword: keyword || "", role: (role != "all" ? role : "") || "" })
    }, [keyword, role]);

    useEffect(() => {
        setCounts(c => ({ ...c, currentPage: Number(page) || 1 }))
    }, [page]);

    useEffect(() => {
        const queryParams = [
            `keyword=${filter.keyword}`,
            `page=${counts.currentPage}`,
            filter.role && `role=${filter.role != "all" ? filter.role : ""}`,
        ].filter(Boolean).join("&");

        setLoading(true);

        const delayDebounce = setTimeout(() => {
            const link = `${BASE_URL}/admin/all?${queryParams}`;
            fetchUsers(link);
            setLoading(false);
        }, 2000);

        return () => clearTimeout(delayDebounce);

    }, [filter, counts.currentPage]);

    const updateParams = useCallback(
        (updates: Record<string, string>) => {
            const params = new URLSearchParams(searchParams.toString())
            Object.entries(updates).forEach(([key, val]) => {
                params.set(key, val)
            });

            const searchString = params.toString()
            const newUrl = `${pathname}${searchString ? `?${searchString}` : ''}`

            router.replace(newUrl);
        },
        [searchParams, pathname, router]
    );

    return (
        <div className="w-full md:w-[90%] mx-auto mt-24 mb-16 bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center py-4 px-2">
                <p className="text-2xl font-semibold">All Users ( {filter ? counts.filteredUsers : counts.totalUsers} )</p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center py-4 gap-4">
                <Input
                    placeholder="Search email, fullname or username..."
                    value={filter.keyword}
                    onChange={(e) => {
                        setFilter({ ...filter, keyword: e.target.value });
                        setCounts({ ...counts, currentPage: 1 });
                        updateParams({ page: "1", keyword: e.target.value });
                    }}
                    className="max-w-sm"
                />
                <div className="flex justify-center items-center space-x-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            setCounts({ ...counts, currentPage: counts.currentPage - 1 });
                            updateParams({ page: `${(Number(page) || 1) - 1}` });
                        }}
                        disabled={counts.currentPage === 1}
                    >
                        Prev
                    </Button>
                    <div className="truncate">
                        {counts.currentPage} / {Math.ceil(counts.filteredUsers / counts.resultPerPage)}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            setCounts({ ...counts, currentPage: counts.currentPage + 1 });
                            updateParams({ page: `${(Number(page) || 1) + 1}` });
                        }}
                        disabled={counts.currentPage === Math.ceil(counts.filteredUsers / counts.resultPerPage)}
                    >
                        Next
                    </Button>
                </div>
            </div>

            <div className="flex flex-wrap justify-evenly items-center space-y-4 py-6 px-4 md:px-6 xl:px-7.5">
                <div className="inline-flex items-center cursor-pointer gap-4">
                    <Label className="ms-3 text-md font-semibold text-slate-700 dark:text-white">Role</Label>
                    <Select
                        value={filter.role}
                        onValueChange={(val) => {
                            setFilter({ ...filter, role: val });
                            setCounts({ ...counts, currentPage: 1 });
                            updateParams({ page: "1", role: val });
                        }}
                    >
                        <SelectTrigger className="w-full sm:w-40">
                            <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">ALL</SelectItem>
                            <SelectItem value="admin">ADMIN</SelectItem>
                            <SelectItem value="user">USER</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <UsersTable users={users} columns={columns} loading={loading} />
        </div>
    );
}