import { ISignupDetails } from "@/types/types";

function emailCheck(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return false;
    }

    return true;
}

function passwordCheck(password: string): boolean {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

    if (!strongPasswordRegex.test(password)) {
        return false;
    }

    return true;
}

const validateForm = (method: string, user: ISignupDetails) => {
    const newErrors: Partial<ISignupDetails> = {};

    if (method !== "Login" && !user.name) {
        newErrors.name = "Name is required";
    }

    if (!user.email) {
        newErrors.email = "Email is required";
    } else if (!emailCheck(user.email)) {
        newErrors.email = "Invalid email format";
    }

    if (!user.password) {
        newErrors.password = "Password is required";
    } else if (!passwordCheck(user.password)) {
        newErrors.password =
            "Password must be at least 8 characters with uppercase, lowercase, number, and special character";
    }

    return newErrors;
};

export { validateForm };