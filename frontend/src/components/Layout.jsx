import Navbar from "./Navbar";

export default function Layout({ children, showNavbar = true }) {
    return (
        <div className="min-h-screen bg-background font-sans antialiased flex flex-col">
            {showNavbar && <Navbar />}
            <main className="flex-1 container mx-auto py-6 px-4 md:px-6">
                {children}
            </main>
        </div>
    );
}
