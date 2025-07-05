"use client";

import { IUser } from '@/types/types';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import UsersForm from './users-form';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api, { BASE_URL } from '@/apis/api';

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    currentRow: IUser;
}

const UsersActionDialog = ({ open, onOpenChange, currentRow }: Props) => {
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState<Partial<IUser>>({
        fullName: currentRow?.fullName || "",
        username: currentRow?.username || "",
        role: currentRow?.role || "user",
    });

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const { data } = await api.put(`${BASE_URL}/admin/user/byId/${currentRow?._id}`, formValues);
            console.log(data);
            toast.success("Successfully Updated User");
            onOpenChange(false);
        } catch (error) {
            console.log(error);
            toast.error("Failed to Update User");
        } finally {
            setLoading(false);
            setFormValues({
                fullName: "",
                username: "",
                role: "user",
            });
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
                    <DialogTitle>Update User</DialogTitle>
                </DialogHeader>
                <ScrollArea className='-mr-4 w-full py-1 pr-4'>
                    <UsersForm
                        formValues={formValues}
                        setFormValues={setFormValues}
                        handleSubmit={handleSubmit}
                    />
                </ScrollArea>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant='outline'>Close</Button>
                    </DialogClose>
                    <Button
                        form='user-form'
                        variant="outline"
                        className='bg-green-500 text-white border-green-600'
                        type='submit'
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            'Save changes'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}

export default UsersActionDialog