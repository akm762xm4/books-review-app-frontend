// import { create } from "zustand";
import type { AuthCredentials } from "../types";

// interface AuthState {
//   authUser: {
//     _id: string | undefined;
//     email: string;
//     name?: string;
//     isAdmin: boolean;
//     token: string;
//   } | null; // You can replace `any` with a proper user type/interface
//   setAuthUser: (data: AuthCredentials) => void;
//   logout: () => void;

//   // Optional: add methods here if you want to mutate state later
// }

export const setAuthUser = (data: AuthCredentials): void => {
  localStorage.setItem("authUser", JSON.stringify(data));
};

export const getAuthUser = (): AuthCredentials | null => {
  const authUser = localStorage.getItem("authUser");
  return authUser ? JSON.parse(authUser) : null;
};

export const removeAuthUser = (): void => {
  localStorage.removeItem("authUser");
};

// export const useAuthState = create<AuthState>((set) => ({
//   authUser: null,
//   setAuthUser: (data: AuthCredentials) => {
//     set({
//       authUser: {
//         _id: data._id,
//         email: data.email,
//         name: data.name,
//         isAdmin: data.isAdmin || false,
//         token: data.token,
//       },
//     });
//   },
//   logout: () => {
//     set({
//       authUser: null,
//     });
//   },
// }));
