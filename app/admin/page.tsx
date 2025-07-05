"use client";

import api, { BASE_URL } from "@/apis/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { IUser } from "@/types/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

interface AllUsersResponse {
    success: boolean;
    count: number;
    resultPerPage: number;
    filteredUsersCount: number;
    users: IUser[];
}

const columns: ColumnDef<IUser>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label='Select all'
                className='translate-y-[2px]'
            />
        ),
        meta: {
            className: cn(
                'sticky md:table-cell left-0 z-10 rounded-tl',
                'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted'
            ),
        },
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label='Select row'
                className='translate-y-[2px]'
            />
        ),
    },
    {
        accessorKey: 'id',
        header: "Id",
        cell: ({ row }) => (
            <div className='max-w-24'>{row.original._id}</div>
        ),
        meta: {
            className: cn(
                'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
                'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
                'sticky left-6 md:table-cell'
            ),
        },
    },
    // {
    //     accessorKey: "name",
    //     header: "Name",
    //     cell: ({ row }) => (
    //         <div className="font-medium">{row.original.fullName}</div>
    //     ),
    // },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const profileImage = row.original?.profilePicture;
            return (
                <div className="flex justify-start items-center gap-4">
                    <div className="rounded-lg flex h-14 w-14 items-center justify-center overflow-hidden">
                        {row.original?.profilePicture && profileImage && profileImage.length > 0 ? (
                            <img src={profileImage} loading="lazy" className="w-full h-full object-cover" alt="" />
                        ) : (
                            <div className="flex items-center justify-center w-full h-full border rounded-full">
                                <p className="text-center text-sm">{`${row.original.fullName[0]}`}</p>
                            </div>
                        )}
                    </div>
                    <div>
                        <p className='max-w-36'>{row.original.fullName}</p>
                        <p className='text-xs'>{row.original.email}</p>
                    </div>
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
        meta: { className: 'w-36' },
    },
    // {
    //     accessorKey: "email",
    //     header: "Email",
    //     cell: ({ row }) => (
    //         <div className="lowercase">{row.original.email}</div>
    //     ),
    // },
    {
        accessorKey: "username",
        header: "Username",
        cell: ({ row }) => <div>{row.original.username || "NULL"}</div>,
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (
            <Badge variant="outline" className="capitalize">{row.original.role}</Badge>
        ),
    },
    {
        accessorKey: "createdAt",
        header: "Joined",
        cell: ({ row }) => (
            <div className="text-sm">
                {new Date(row.original.createdAt).toLocaleDateString()}
            </div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={(e) => {
                                e.stopPropagation();
                                navigator.clipboard.writeText(row.original._id!);
                            }}
                        >
                            Copy User ID
                        </DropdownMenuItem>
                        <DropdownMenuItem
                        // onClick={() => navigate(`/users/user?id=${row.original._id!}`)}
                        >
                            View Details
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export default function AdminPage() {

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
            console.log(data);
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
        setFilter({ keyword: keyword || "", role: role || "" })
    }, [keyword, role]);

    useEffect(() => {
        setCounts(c => ({ ...c, currentPage: Number(page) || 1 }))
    }, [page]);

    // useEffect(() => {
    //     setFilter({
    //         ...filter,
    //         keyword: keyword || "",
    //         role: role || "",
    //     });
    //     setCounts({ ...counts, currentPage: Number(page) || 1 });
    // }, [searchParams, filter, keyword, role, counts, page]);

    useEffect(() => {
        const queryParams = [
            `keyword=${filter.keyword}`,
            `page=${counts.currentPage}`,
            filter.role && `role=${filter.role}`,
        ].filter(Boolean).join("&");

        setLoading(true);

        const delayDebounce = setTimeout(() => {
            const link = `${BASE_URL}/admin/all?${queryParams}`;
            fetchUsers(link);
            setLoading(false);
        }, 2000);

        return () => clearTimeout(delayDebounce);

    }, [filter, counts.currentPage]);

    const table = useReactTable({
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    const updateParams = useCallback(
        (updates: Record<string, string>) => {
            const params = new URLSearchParams(searchParams.toString())
            Object.entries(updates).forEach(([key, val]) => {
                params.set(key, val)
            });

            const searchString = params.toString()
            const newUrl = `${pathname}${searchString ? `?${searchString}` : ''}`

            router.push(newUrl);
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
                    placeholder="Search User Email"
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
                            {/* <SelectItem value="">ALL</SelectItem> */}
                            <SelectItem value="admin">ADMIN</SelectItem>
                            <SelectItem value="user">USER</SelectItem>
                        </SelectContent>
                    </Select>
                    <label className="ms-3 text-md font-semibold text-slate-700 dark:text-white">Role</label>
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef
                                                    .header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                // onClick={() => navigate(`/users/user?id=${row.original._id}`)}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}