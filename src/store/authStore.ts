import { User } from "@/types/userType";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// AuthState 인터페이스를 export 합니다.
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (userData: User) => void; // login 시 User 타입 사용
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    set => ({
      user: null, // 초기 사용자 null
      isAuthenticated: false, // 초기 인증 상태 false
      isLoading: true, // 초기 로딩 상태 true (persist 복원 후 false로 변경 고려)
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
    }),
    {
      name: "auth-storage", // localStorage에 저장될 때 사용될 키 이름
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => state => {
        // 스토어 복원 완료 시 호출
        if (state) state.isLoading = false; // 로딩 상태 해제
        console.log("AuthStore rehydrated, isLoading set to false.");
      },
      partialize: (state: AuthState) =>
        ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }) as AuthState,
    }
  )
);

// 선택 사항: 스토어의 특정 부분만 선택하기 위한 셀렉터
export const selectUser = (state: AuthState) => state.user;
export const selectIsAuthenticated = (state: AuthState) =>
  state.isAuthenticated;
export const selectAuthLoading = (state: AuthState) => state.isLoading;
