import { create } from "zustand";
import { persist } from "zustand/middleware"

interface IAuth {
    token: string,
    role: string,
    username: string,
    isVerified: boolean,
    profilePictureUrl: string,
    country: string,
    companyName: string
}

const authStore = create(persist((set) => ({
    token: '',
    role: '',
    username: '',
    isVerified: false,
    profilePictureUrl: '',
    companyName: '',
    country: '',
    
    setAuth: ({ token, role, username, isVerified, profilePictureUrl, country, companyName }: IAuth) => {
        set({ token, role, username, isVerified, profilePictureUrl: profilePictureUrl || '', country, companyName: companyName || ''  })
    },
    setKeepAuth: ({ role, username, isVerified, profilePictureUrl, country, companyName }: Partial<IAuth>) => {
        set({ role, username, isVerified, profilePictureUrl: profilePictureUrl || '', country, companyName: companyName || '' })
    },
    setLogout: () => set({ token: '', role: '', username: '', isVerified: false, profilePictureUrl: '', country: '', companyName: '' })

}), {
    name: 'authToken',
    partialize: (state: any) => ({token: state.token})
}))

export default authStore