import { IUser } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import UsersActions from "./users-actions";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<IUser>[] = [
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
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const profileImage = row.original?.profilePicture;
            return (
                <div className="flex justify-start items-center gap-4">
                    <div className="rounded-lg flex h-14 w-14 items-center justify-center overflow-hidden">
                        {row.original?.profilePicture && profileImage && profileImage.length > 0 ? (
                            <img src={profileImage} loading="lazy" className="w-full h-full rounded-full object-cover" alt="" />
                        ) : (
                            <div className="flex items-center justify-center w-full h-full border rounded-full">
                                <p className="text-center text-md">{`${row.original.fullName.split(" ").map((n) => n[0]).join("")}`}</p>
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
    },
    {
        accessorKey: "visibility",
        header: "Visibility",
        cell: ({ row }) => <div className="capitalize">{row.original.visibility}</div>,
    },
    {
        accessorKey: "isOnline",
        header: "Status",
        cell: ({ row }) => {
            const isOnline = row.original.isOnline;
            return (
                <Badge
                    variant="outline"
                    className={`capitalize px-3 py-1 rounded-full ${isOnline ? "border-green-500 bg-green-200" : "border-yellow-500 bg-yellow-200"}`}
                >
                    {isOnline ? "online" : "offline"}
                </Badge>
            )
        },
    },
    {
        accessorKey: "username",
        header: "Username",
        cell: ({ row }) => <div>{row.original.username || "NULL"}</div>,
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
            const role = row.original.role;
            return (
                <Badge
                    variant="outline"
                    className={`capitalize px-3 py-1 rounded-full ${role === "admin" ? "border-green-500 bg-green-200" : "border-yellow-500 bg-yellow-200"}`}
                >
                    {row.original.role}
                </Badge>
            )
        },
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
        cell: UsersActions
    }
];