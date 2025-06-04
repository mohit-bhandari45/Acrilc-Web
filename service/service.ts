import axios from "axios";

const IMGBB_API_KEY = "34cb3d0fe2362f6b0dcf3fcd9e8860b6";

type ImgBBResponse = {
    data: {
        url: string,
        display_url: string,
        size: number,
        image: {
            filename: string
        };
    };
    success: boolean;
    status: number
}

class UploadService {
    static async uploadToImgBB(file: File): Promise<string> {
        const formdata = new FormData();
        formdata.append("image", file);

        try {
            const response = await axios.post<ImgBBResponse>(
                `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
                formdata
            );

            if (!response.data.success) {
                console.error("Upload failed response:", response.data);
                throw new Error("Upload failed");
            }

            return response.data.data.url;
        } catch (error: any) {
            console.error("Error uploading to ImgBB:", error?.response?.data || error.message);
            throw error;
        }
    }
}

export default UploadService;