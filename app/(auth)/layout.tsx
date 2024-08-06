import Image from "next/image";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex main-h-screen w-full justify-between font-inter">
            {children}
            <div className="auth-asset">
                <div>
                    <Image src="/icons/Next.png" alt="auth-img" width={600} height={600}/>
                </div>
            </div>
        </main>
    );
}
