export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="">
            <p>sidebar</p>
            {children}
            {/* <Footer /> */}
        </div>
    );
}