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
            className={`${width} flex flex-col justify-center gap-1 px-1 sm:px-2`}
        >
            <label
                htmlFor={fieldName}
                className="px-3 text-sm font-semibold tracking-wide text-[#765240]"
            >
                {label}
            </label>
            <Input
                id={fieldName}
                onChange={handleChange}
                name={fieldName}
                value={user[fieldName] || ""}
                placeholder={`Enter Your ${label}`}
                className="h-12 rounded-full border-[#ead7c9] bg-white/90 px-5 text-[15px] shadow-[0_8px_20px_rgba(89,59,43,0.06)] placeholder:text-[#9a8578] focus-visible:border-[#c98d68] focus-visible:ring-2 focus-visible:ring-[#e8b08f]/30"
                type={type}
                autoComplete={fieldName === "password" ? "current-password" : fieldName}
            />
        </div>
    );
};
