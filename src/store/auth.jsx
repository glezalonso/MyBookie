import {create} from 'zustand'
import { persist } from 'zustand/middleware'

 export const useAuthStore = create(persist((set) => ({
    token:'',
    isLogged: false,
    profile:'',
    isAdmin:'',
    setProfile: (username) => set(status =>({profile:username})),
    setToken: (token) => set(status => ({token, isLogged:true})),
    setIsAdmin:(isAdmin) =>set(status =>({isAdmin})),
    logOut: () => set(status => ({token:'', isLogged:false}))

}),{
    name: 'auth'
}))

