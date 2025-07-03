export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex">
            <div className="w-[300px] bg-gray-400">sidebar</div>
            {children}
        </div>
    );
}