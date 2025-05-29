import api, { ADD_TO_MARKET, GET_SINGLE_Market_PROJECT } from "@/apis/api";
import UploadService from "@/service/service";
import { IMarketplace } from "@/types/marketplace";

export interface FormData {
    title: string;
    year: string;
    description: string;
    additionalInfo: string;
    forte: string;
    keywords: string;
    contactInfo: string;
    showContactInfo: boolean;
}

export interface PricingOption {
    id: string;
    currency: string;
    size: string;
    price: string;
}

export const currencies = [
    { value: "INR", label: "INR (₹)" },
    { value: "USD", label: "USD ($)" },
    { value: "EUR", label: "EUR (€)" },
    { value: "GBP", label: "GBP (£)" },
    { value: "JPY", label: "JPY (¥)" },
    { value: "CNY", label: "CNY (¥)" },
    { value: "AUD", label: "AUD (A$)" },
    { value: "CAD", label: "CAD (C$)" },
    { value: "SGD", label: "SGD (S$)" },
    { value: "CHF", label: "CHF (Fr)" },
    { value: "ZAR", label: "ZAR (R)" },
    { value: "RUB", label: "RUB (₽)" },
    { value: "BRL", label: "BRL (R$)" },
    { value: "KRW", label: "KRW (₩)" },
    { value: "MXN", label: "MXN $)" },
];

export async function handleGetSingleProject(id: string): Promise<{ data: IMarketplace | null, error: string }> {
    try {
        const response = await api.get(`${GET_SINGLE_Market_PROJECT}/${id}`);

        return { data: response.data.data, error: "" };
    } catch (error) {
        return { data: null, error: error as string };
    }
}

export async function handleAddToMarket(formData: FormData, file: File, pricingOptions: PricingOption[], isDraft: boolean): Promise<{ data: string | null, status: boolean }> {
    try {
        const url = await UploadService.uploadToImgBB(file);

        const data = {
            ...formData, url, pricingOptions, isDraft
        }

        const res = await api.post(ADD_TO_MARKET, data); return {data: res.data.data, status: true};
    } catch (error) {
        console.log(error);
        return {data: "", status: false};
    }
}