import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Cloud, LayoutDashboard, LogOut, User, Users } from "lucide-react";
import Notifications from "./Notifications";

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-14 items-center px-4 md:px-6">
                <Link to="/" className="flex items-center gap-2 font-bold text-xl mr-6 hover:opacity-80 transition-opacity">
                    <div className="p-1.5 bg-primary rounded-lg text-primary-foreground">
                        <Cloud className="h-5 w-5" />
                    </div>
                    <span className="hidden sm:inline-block">Mini Drive</span>
                </Link>

                <div className="flex flex-1 items-center justify-end space-x-2">
                    {user ? (
                        <>
                            {user.role === 'admin' && (
                                <Link to="/admin">
                                    <Button variant="ghost" size="sm" className="hidden md:flex gap-2">
                                        <LayoutDashboard className="h-4 w-4" />
                                        Admin Dashboard
                                    </Button>
                                </Link>
                            )}
                            <Link to="/shared">
                                <Button variant="ghost" size="sm" className="hidden md:flex gap-2">
                                    <Users className="h-4 w-4" />
                                    Shared with me
                                </Button>
                            </Link>
                            <Notifications />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={user.avatar} alt={user.name} />
                                            <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{user.name}</p>
                                            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {user.role === 'admin' && (
                                        <DropdownMenuItem asChild>
                                            <Link to="/admin" className="cursor-pointer w-full flex items-center">
                                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                                Admin Dashboard
                                            </Link>
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem asChild>
                                        <Link to="/" className="cursor-pointer w-full flex items-center">
                                            <Cloud className="mr-2 h-4 w-4" />
                                            My Files
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link to="/shared" className="cursor-pointer w-full flex items-center">
                                            <Users className="mr-2 h-4 w-4" />
                                            Shared with me
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <div className="flex gap-2">
                            <Link to="/login"><Button variant="ghost">Login</Button></Link>
                            <Link to="/signup"><Button>Sign Up</Button></Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
