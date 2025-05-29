"use client"

import React, { useState } from 'react'
import { isEqual } from "lodash"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { Modal } from '@/components/wrappers/modal'

import { useProfilesStore } from '@/store/profiles'
import { useSessionStorage } from '@/store/storage'
import { useUser } from '@/store/user'

import { channelGroups, formatChannel } from '@/constants'

import { IProfiles } from '@/interfaces'

import { Trash2 } from 'lucide-react'

const Page = () => {

    const [newProfile, setNewProfile] = useState<string>('')

    const {
        enabledChannel,
        toggleChannel,
        profiles,
        addProfile,
        deleteProfile,
        saveProfiles
    } = useProfilesStore()

    const { electron, setElectron, removeElectron } = useSessionStorage()
    const { user, setUser } = useUser()

    if (!user) {
        return (
            <main className="flex flex-col items-center justify-center h-screen bg-gray-50 space-y-2">
                <h1 className="text-2xl font-semibold text-gray-800">No user session found</h1>
                <p className="text-sm text-gray-600">Please sign in again to access your channel settings.</p>
            </main>
        )
    }

    return (
        <main className="bg-white shadow-md rounded-lg p-6 space-y-4">

            <header>
                <h1 className="text-3xl font-semibold text-gray-900 poppins-light ml-2">Profiles Settings</h1>
            </header>

            <section className="border p-6 rounded-md shadow-sm bg-gray-50 space-y-6">

                <div className='flex flex-col gap-2 ml-2'>
                    <h2 className="text-2xl font-semibold text-gray-900 poppins-regular">Profiles Channels</h2>
                    <span className="text-sm text-gray-600">Choose how you'd like to receive notifications</span>
                </div>

                {Object.entries(channelGroups).map(([groupLabel, channels]) => (
                    <div key={groupLabel} className="space-y-2">
                        <h3 className="text-lg font-medium text-gray-800 ml-2">{groupLabel}</h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {channels.map(channel => (
                                <div key={channel} className='border rounded-md p-4 bg-white shadow-sm flex flex-col justify-center gap-2'>
                                    <div className="flex justify-between items-center">
                                        <Label>{formatChannel(channel)}</Label>
                                        <input
                                            type="checkbox"
                                            checked={!!enabledChannel[channel]}
                                            onChange={() => toggleChannel(channel)}
                                            className="w-5 h-5 accent-blue-600"
                                        />
                                    </div>

                                    {enabledChannel[channel] && (
                                        <div className='flex justify-center items-center gap-2 w-full mt-auto'>
                                            <Modal
                                                title={`Edit ${channel} Profiles`}
                                                description={`Manage your ${channel.toLowerCase()} destinations.`}
                                                trigger={
                                                    <Button variant="secondary" className='cursor-pointer w-1/2 border'>
                                                        Edit Profiles
                                                    </Button>
                                                }
                                                content={
                                                    <div className='space-y-3'>
                                                        {(profiles[channel as keyof IProfiles] || []).length === 0 && (
                                                            <p className='text-sm text-gray-500'>No profiles added yet.</p>
                                                        )}
                                                        {(profiles[channel as keyof IProfiles] || []).map(profile => (
                                                            <div key={profile} className='flex justify-between items-center border px-3 py-2 rounded-md'>
                                                                <span className='text-sm'>{profile}</span>
                                                                <Button
                                                                    variant="destructive"
                                                                    size="icon"
                                                                    onClick={() => deleteProfile(channel, profile)}
                                                                    className='cursor-pointer'
                                                                >
                                                                    <Trash2 />
                                                                </Button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                }
                                            />

                                            <Modal
                                                title={`Add ${channel} Profile`}
                                                description={`Add a new ${channel.toLowerCase()} destination.`}
                                                trigger={<Button className='cursor-pointer w-1/2'>Add Profile</Button>}
                                                content={
                                                    <div className='space-y-3'>
                                                        <Input
                                                            placeholder={`Enter new ${channel.toLowerCase()}...`}
                                                            value={newProfile}
                                                            onChange={(e) => setNewProfile(e.target.value)}
                                                        />
                                                        <Button onClick={() => addProfile(channel, newProfile)} className='w-full cursor-pointer'>
                                                            Save Profile
                                                        </Button>
                                                    </div>
                                                }
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </section>

            {!isEqual(user?.profiles, profiles) ? (
                <section className="border p-6 rounded-md shadow-sm bg-gray-50 flex flex-col items-start">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-semibold text-gray-900 poppins-regular">Save Your Preferences</h2>
                        <p className="text-sm text-gray-600">
                            Once you've configured your preferred channels and added the necessary profiles, click below to save your changes.
                        </p>
                    </div>
                    <Button
                        onClick={() => saveProfiles(electron)}
                        className="mt-4 px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                    >
                        Save Changes
                    </Button>
                </section>
            ) : null}

        </main>
    )
}

export default Page
