import React from 'react'
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { IUser } from '@/types/types';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

interface Props {
    formValues: Partial<IUser>;
    setFormValues: (values: Partial<IUser>) => void;
    handleSubmit: (values: Partial<IUser>) => void;
}

const UsersForm = ({ formValues, setFormValues, handleSubmit }: Props) => {

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit(formValues);
    };

    return (
        <form
            id='user-form'
            onSubmit={onFormSubmit}
            className='flex flex-col justify-center items-center space-y-4'
        >
            <div className='w-full space-y-2'>
                <Label>Full Name</Label>
                <Input
                    placeholder='Enter full name'
                    value={formValues.fullName}
                    onChange={e => {
                        setFormValues({ ...formValues, fullName: e.target.value });
                    }}
                />
            </div>
            <div className='w-full space-y-2'>
                <Label>User Name</Label>
                <Input
                    placeholder='Enter user name'
                    value={formValues.username}
                    onChange={e => {
                        setFormValues({ ...formValues, username: e.target.value });
                    }}
                />
            </div>
            <div className='w-full space-y-2'>
                <Label>Role</Label>
                <Select
                    value={formValues.role}
                    onValueChange={(val) => {
                        setFormValues({ ...formValues, role: val as "user" | "admin" });
                    }}
                >
                    <SelectTrigger className="w-full sm:w-40">
                        <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="admin">ADMIN</SelectItem>
                        <SelectItem value="user">USER</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </form>
    )
}

export default UsersForm;