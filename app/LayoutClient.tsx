"use client"

import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/wrappers/modal";
import { LoginForm } from "@/components/forms/login";
import { User } from "@/components/layout/nav/user";

import { useLocalStorage } from "@/store/storage";
import { useUser } from "@/store/user";

import {
    BellDot,
    ChevronRight,
    CircleHelp,
    MessageCircleDashed,
    Phone,
    Settings,
    Star,
} from "lucide-react";

interface ILayoutClientProps { children: React.ReactNode }

const LayoutClient = ({
    children
}: ILayoutClientProps
) => {
    
    const { proton, setProton, removeProton } = useLocalStorage()
    const { user, setUser } = useUser()
    
    return (
        <main className="h-screen w-screen flex flex-col">

            <header className="flex items-center justify-between px-6 py-4 border-b bg-white">
                <h1 className="text-3xl poppins-light font-semibold text-gray-900">Corsola</h1>
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon">
                        <BellDot className="text-gray-600" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <CircleHelp className="text-gray-600" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Settings className="text-gray-600" />
                    </Button>
                    <Button className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 transition">
                        <Star className="w-4 h-4" />
                        <span className="text-sm font-medium">Upgrade</span>
                    </Button>
                </div>
            </header>

            <section className="flex flex-grow min-h-0">

                <aside className="w-64 bg-white border-r flex flex-col justify-between">
                    <div className="p-4">
                        {proton ? (
                            <User
                                avatar={user?.avatar || "https://ui.shadcn.com/avatars/shadcn.jpg"}
                                name={user?.username || "shadcn"}
                                email="m@example.com"
                            />
                        ) : (
                            <Modal
                                trigger={<Button className="w-full cursor-pointer">Log In</Button>}
                                title="Sign In to Your Account"
                                description="Please enter your credentials to access your dashboard and manage your tasks."
                                content={
                                    <div className='flex flex-col gap-4'>
                                        <div className='flex justify-between items-center'>
                                            <Button className='w-[49%]'>Google</Button>
                                            <Button className='w-[49%]'>Facebook</Button>
                                        </div>
                                        <div className='flex justify-center items-center gap-4'>
                                            <div className='border border-black w-full'></div>
                                            <span>OR</span>
                                            <div className='border border-black w-full'></div>
                                        </div>
                                        <LoginForm />
                                    </div>
                                }
                            />
                        )}
                        <nav className="space-y-6 mt-4">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide px-2 mb-2">Navigate</p>
                                <ul className="space-y-1">
                                    {[
                                        { name: "Dashboard", icon: "LayoutDashboard", href: "" },
                                        { name: "Profiles", icon: "Users", href: "/profiles" },
                                        { name: "Notifications", icon: "Bell", href: "/notifications" },
                                        { name: "Pages", icon: "FileText", href: "#" },
                                        { name: "Media Files", icon: "Image", href: "#" }
                                    ].map((item, index) => {
                                        const Icon = require("lucide-react")[item.icon];
                                        return (
                                            <li key={index}>
                                                <Link
                                                    href={item.href}
                                                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition"
                                                >
                                                    <Icon className="w-4 h-4 text-gray-500" />
                                                    {item.name}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide px-2 mb-2">More</p>
                                <ul className="space-y-1">
                                    {[
                                        { name: "Settings", icon: "Settings" },
                                        { name: "Language", icon: "Languages" },
                                        { name: "Night Mode", icon: "Moon" },
                                    ].map((item, index) => {
                                        const Icon = require("lucide-react")[item.icon];
                                        return (
                                            <li key={index}>
                                                <a
                                                    href="#"
                                                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition"
                                                >
                                                    <Icon className="w-4 h-4 text-gray-500" />
                                                    {item.name}
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </nav>

                    </div>

                    <div className="flex justify-around items-center px-4 py-3 border-t bg-gray-50">
                        <Button variant="ghost" size="icon">
                            <Phone className="text-gray-500" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <MessageCircleDashed className="text-gray-500" />
                        </Button>
                        {[...Array(3)].map((_, i) => (
                            <Button key={i} variant="ghost" size="icon">
                                <ChevronRight className="text-gray-400" />
                            </Button>
                        ))}
                    </div>
                </aside>

                <main className="flex-grow p-4 overflow-y-auto bg-[#f9fafb]">
                    {children}
                </main>

            </section>

            <footer className="border-t bg-white text-sm text-gray-500 px-6 py-4">
                © {new Date().getFullYear()} Corsola. All rights reserved.
            </footer>
        </main>
    )
    
}

export { LayoutClient }