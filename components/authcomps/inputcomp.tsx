import { ISignupDetails } from "@/types/types";
import { Input } from "../ui/input";

interface InputProps {
    label: string;
    height: string;
    width: string;
    user: ISignupDetails;
    setFormUser: React.Dispatch<React.SetStateAction<ISignupDetails>>;
    type?: string;
}

export const InputComp = ({
    label,
    user,
    width,
    setFormUser,
    type = "text",
}: InputProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormUser((prevUser) => ({
            ...prevUser,
            [name.toLowerCase()]: value,
        }));
    };

    const fieldName = label.toLowerCase() as keyof ISignupDetails;

    return (
        <div
            className={`${width} flex flex-col px-3 justify-center items-start gap-1`}
        >
            <label
                htmlFor={fieldName}
                className="text-[rgba(172,82,9,1)] font-semibold"
            >
                {label}
            </label>
            <Input
                id={fieldName}
                onChange={handleChange}
                name={fieldName}
                value={user[fieldName] || ""}
                placeholder={`Enter Your ${label}`}
                className="rounded-full border-black placeholder:text-gray-600 px-5 h-14 focus-visible:ring-orange-500"
                type={type}
                autoComplete={fieldName === "password" ? "current-password" : fieldName}
            />
        </div>
    );
};
