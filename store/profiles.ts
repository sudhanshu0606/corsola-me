import { IProfiles } from '@/interfaces'
import axios from 'axios'
import { toast } from 'sonner'
import { create } from 'zustand'

type ProfilesStore = {
    enabledChannel: Record<string, boolean>
    toggleChannel: (channel: string) => void
    profiles: IProfiles
    setProfiles: (profiles: IProfiles) => void
    addProfile: (channel: string, profile: string) => void
    deleteProfile: (channel: string, profile: string) => void
    saveProfiles: (token: string) => Promise<void>
}

const useProfilesStore = create<ProfilesStore>((set, get) => ({

    enabledChannel: {},

    toggleChannel: (channel) =>
        set((state) => {
            const isSelected = !!state.enabledChannel[channel]
            return {
                enabledChannel: isSelected ? {} : { [channel]: true }
            }
        }),

    profiles: {
        email: [],
        sms: [],
        call: [],
        voicemail: [],
        whatsapp: [],
        telegram: [],
        signal: [],
        viber: [],
        messenger: [],
        wechat: [],
        line: [],
        slack: [],
        microsoftTeams: [],
        discord: [],
        facebook: [],
        instagram: [],
        twitter: [],
        linkedin: [],
        threads: [],
    },

    setProfiles: (profiles: IProfiles) => set({ profiles: profiles }),

    addProfile: (channel, profile) =>
        set((state) => {
            if (!profile.trim()) return state
            const existing = state.profiles[channel as keyof IProfiles] || []
            return {
                profiles: {
                    ...state.profiles,
                    [channel]: [...existing, profile.trim()]
                }
            }
        }),

    deleteProfile: (channel, profile) =>
        set((state) => ({
            profiles: {
                ...state.profiles,
                [channel]: (state.profiles[channel as keyof IProfiles] || []).filter((p) => p !== profile)
            }
        })),

    saveProfiles: async (token: string) => {

        const { profiles } = get();

        toast.promise(
            async () => {
                await axios.post('/api/profiles', { profiles }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            },
            {
                loading: 'Saving profiles...',
                success: 'Profiles saved successfully!',
                error: 'Failed to save profiles.',
            }
        );

    },

}))

export { useProfilesStore }
