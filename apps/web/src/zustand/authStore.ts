import { create } from "zustand";
import { persist } from "zustand/middleware"

interface IAuth {
    token: string,
    role: string,
    username: string,
    isVerified: boolean,
    profilePictureUrl: string,
    country: string
}

const authStore = create(persist((set) => ({
    token: '',
    role: '',
    username: '',
    isVerified: false,
    profilePictureUrl: '',
    country: '',
    
    setAuth: ({ token, role, username, isVerified, profilePictureUrl, country }: IAuth) => {
        set({ token, role, username, isVerified, profilePictureUrl: profilePictureUrl || '', country })
    },
    setKeepAuth: ({ role, username, isVerified, profilePictureUrl, country }: Pick<IAuth , 'role' | 'username' | 'isVerified' | 'profilePictureUrl' | 'country' >) => {
        set({ role, username, isVerified, profilePictureUrl: profilePictureUrl || '',country })
    },
    setLogout: () => set({ token: '', role: '', username: '', isVerified: false, profilePictureUrl: '', country: '' })

}), {
    name: 'authToken',
    partialize: (state: any) => ({token: state.token})
}))

export default authStore