import {create} from 'zustand'
import { persist } from 'zustand/middleware'

 export const useAuthStore = create(persist((set) => ({
    token:'',
    isLogged: false,
    profile:'',
    setProfile: (username) => set(status =>({profile:username})),
    setToken: (token) => set(status => ({token, isLogged:true})),
    logOut: () => set(status => ({token:'', isLogged:false}))
}),{
    name: 'auth'
}))

