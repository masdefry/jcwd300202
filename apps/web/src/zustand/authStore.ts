import { create } from "zustand";
import { persist } from "zustand/middleware"

interface IAuth {
    token: string,
    role: string,
    username: string,
    isVerified: boolean,
    profilePictureUrl: string
}

const authStore = create(persist((set) => ({
    token: '',
    role: '',
    username: '',
    isVerified: false,
    profilePictureUrl: '',
    
    setAuth: ({ token, role, username, isVerified, profilePictureUrl }: IAuth) => {
        set({ token, role, username, isVerified, profilePictureUrl: profilePictureUrl || '' })
    },
    setKeepAuth: ({ role, username, isVerified, profilePictureUrl }: Pick<IAuth , 'role' | 'username' | 'isVerified' | 'profilePictureUrl' >) => {
        set({ role, username, isVerified, profilePictureUrl: profilePictureUrl || '' })
    },
    setLogout: () => set({ token: '', role: '', username: '', isVerified: false, profilePictureUrl: '' })

}), {
    name: 'authToken',
    partialize: (state: any) => ({token: state.token})
}))

export default authStore