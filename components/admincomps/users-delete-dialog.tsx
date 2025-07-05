"use client";

import { IUser } from '@/types/types';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api, { BASE_URL } from '@/apis/api';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    currentRow: IUser;
}

const UsersDeleteDialog = ({ open, onOpenChange, currentRow }: Props) => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");

    const handleDelete = async () => {
        if (username !== currentRow.username) {
            toast.error("Username doesn't match");
            return;
        }
        setLoading(true);
        try {
            await api.delete(`${BASE_URL}/admin/user/byId/${currentRow?._id}`);
            toast.success("User deleted successfully!!");
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete User!!");
        } finally {
            setLoading(false);
            setUsername("");
        }
    }

    useEffect(() => {
        if (!currentRow) {
            onOpenChange(false);
        }
    }, [onOpenChange, currentRow]);

    return (
        <Dialog
            open={open}
            onOpenChange={(v) => {
                onOpenChange(v);
            }}
        >
            <DialogContent className='sm:max-w-xl'>
                <DialogHeader className='text-left'>
                    <DialogTitle>Delete User</DialogTitle>
                    <DialogDescription className='text-red-500'>{`Enter the user's username - ${currentRow.username}, to delete the user`}</DialogDescription>
                </DialogHeader>
                <div className='w-full space-y-2'>
                    <Label>{`Enter User's Username`}</Label>
                    <Input
                        placeholder='Enter username'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant='outline'>Close</Button>
                    </DialogClose>
                    <Button
                        variant="outline"
                        className='bg-red-500 text-white border-red-600'
                        disabled={username !== currentRow.username || loading}
                        onClick={handleDelete}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            'Delete User'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}

export default UsersDeleteDialog;