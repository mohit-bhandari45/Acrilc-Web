"use client";

import { Button } from "../ui/button";
import { Row } from "@tanstack/react-table";
import { IUser } from "@/types/types";
import UsersActionDialog from "./users-action-dialog";
import { useState } from "react";
import UsersDeleteDialog from "./users-delete-dialog";

const UsersActions = ({ row }: { row: Row<IUser> }) => {
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    return (
        <>
            <UsersActionDialog open={openUpdate} onOpenChange={setOpenUpdate} currentRow={row.original} />
            <UsersDeleteDialog open={openDelete} onOpenChange={setOpenDelete} currentRow={row.original} />
            <div className="flex justify-center items-center gap-2 select-none">
                <Button
                    variant="outline"
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpenUpdate(true);
                    }}
                >
                    Update User
                </Button>
                <Button
                    variant="outline"
                    className="bg-red-500 text-white"
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpenDelete(true);
                    }}
                >
                    Delete User
                </Button>
            </div>
        </>
    )
}

export default UsersActions;