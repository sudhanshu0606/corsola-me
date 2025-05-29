"use client"

import { useEffect } from "react"

import { useProfilesStore } from "@/store/profiles"
import { useUser } from "@/store/user"

export default function Template({
    children
}: {
    children: React.ReactNode
}) {

    const { setProfiles } = useProfilesStore()
    const { user } = useUser()

    useEffect(() => {
        user?.profiles && setProfiles(user?.profiles);
    }, [user?.profiles]);

    return <>{children}</>

}