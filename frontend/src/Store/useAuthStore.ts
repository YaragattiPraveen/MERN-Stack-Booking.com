import { create } from 'zustand'
import { devtools } from 'zustand/middleware'


export const useAuthStore = create(
    devtools((set) => {
        const initialState = {
            isAuthenticated: false,
            userDetails: {}
        };

        return {
            ...initialState,
            loggedIn: (userDetails: any) => set({ isAuthenticated:true, userDetails }),
            logOut: () => set({ isAuthenticated: false, userDetails: {} })
        }
    })
)

