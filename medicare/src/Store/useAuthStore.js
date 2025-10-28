import {create} from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";

const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            token: null,
            login: (userData, authToken) => set({user: userData, token: authToken}),
            logout: () => set({user: null, token: null}),
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useAuthStore;
