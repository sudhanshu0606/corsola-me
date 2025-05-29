import React from 'react'

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ChevronsUpDown, LogOut, Sparkles } from 'lucide-react'

type UserProps = {
    avatar: string;
    name: string;
    email: string
};

const User: React.FC<UserProps> = ({ avatar, name, email }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='w-full p-2 border border-black'>
                <Button
                    variant="secondary"
                    size="lg"
                    className='w-full flex justify-center items-center gap-4'
                >
                    <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={avatar} alt={name} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col justify-center items-start'>
                        <span className='font-light'>{name}</span>
                        <span className='font-light'>{email}</span>
                    </div>
                    <ChevronsUpDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                side="bottom"
                align="end"
                sideOffset={4}
                className='min-w-56'
            >
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Sparkles />
                        Upgrade to Pro
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogOut />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export { User }