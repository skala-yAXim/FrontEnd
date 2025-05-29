import { create } from "zustand";

// 사용자 정보 타입 (예시 코드)
interface User {
  id: string;
  name: string | null;
  email: string | null;
  // roles 또는 permissions 같은 권한 정보 추가 가능
  roles?: string[];
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (userData: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  login: userData =>
    set({
      user: userData,
      isAuthenticated: true,
      isLoading: false,
      error: null,
    }),
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    }),
  setLoading: loading => set({ isLoading: loading }),
  setError: error => set({ error: error, isLoading: false }),
}));

// 선택 사항: 스토어의 특정 부분만 선택하기 위한 셀렉터
export const selectUser = (state: AuthState) => state.user;
export const selectIsAuthenticated = (state: AuthState) =>
  state.isAuthenticated;
export const selectAuthLoading = (state: AuthState) => state.isLoading;
