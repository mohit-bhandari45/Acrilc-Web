"use client";

import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdminPage = () => {
    const router = useRouter();
    return (
        <div className="flex justify-center items-center">
            <Card className="w-full max-w-sm space-y-6">
                <CardHeader className="mt-4 text-center">
                    <CardTitle className="text-2xl font-bold">Admin Pannel</CardTitle>
                    <CardDescription className="text-md font-semibold">
                        Visit all available routes
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col justify-center items-center">
                    <Button variant="outline" className="w-full" onClick={() => router.push("/admin/users")}>Users</Button>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <p className="text-sm">Admin Pannel @Acrilc</p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default AdminPage;