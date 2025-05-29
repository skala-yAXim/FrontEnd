import { create } from "zustand";

// 사용자 정보 타입 (예시 코드)
interface User {
  id: string;
  name: string | null;
  email: string | null;
  roles?: string[]; // 이 부분은 UserRole 타입을 사용할 수도 있습니다.
}

// 사용자의 역할을 정의합니다: MEMBER, LEADER
export type UserRole = "MEMBER" | "LEADER" | null;

// AuthState 인터페이스를 export 합니다.
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  userRole: UserRole;
  isLeaderPersonalView: boolean; // LEADER가 개인 메뉴를 보고 있는지 여부 (isTeamLeadPersonalView -> isLeaderPersonalView)
  login: (userData: User, role: UserRole) => void; // login 시 role도 받도록 수정 (선택 사항)
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setUserRole: (role: UserRole) => void;
  toggleLeaderView: () => void; // toggleTeamLeadView -> toggleLeaderView
}

const DEV_DEFAULT_ROLE_FROM_ENV = process.env.NEXT_PUBLIC_DEV_DEFAULT_ROLE as
  | UserRole
  | undefined;

const DEV_DEFAULT_USER: User | null =
  process.env.NODE_ENV === "development"
    ? {
        id: "dev-user",
        name: process.env.NEXT_PUBLIC_DEV_DEFAULT_USER_NAME || "개발용 계정",
        email: "dev@example.com",
      }
    : null;

const DEV_DEFAULT_ROLE: UserRole =
  process.env.NODE_ENV === "development"
    ? DEV_DEFAULT_ROLE_FROM_ENV || "MEMBER" // .env에서 가져오거나, 없으면 기본 MEMBER
    : null;

const DEV_IS_AUTHENTICATED: boolean =
  process.env.NODE_ENV === "development" ? true : false;
const DEV_IS_LOADING: boolean =
  process.env.NODE_ENV === "development" ? false : true; // 개발 시 로딩 false, 프로덕션 시 초기 로딩 true

export const useAuthStore = create<AuthState>(set => ({
  user: DEV_DEFAULT_USER,
  isAuthenticated: DEV_IS_AUTHENTICATED,
  isLoading: DEV_IS_LOADING, // 개발 시에는 바로 false로 시작하여 로딩 화면 스킵
  error: null,
  userRole: DEV_DEFAULT_ROLE,
  isLeaderPersonalView: DEV_DEFAULT_ROLE === "LEADER" ? false : false, // 개발 기본 역할이 LEADER면 개인 뷰는 false
  login: (userData, role) =>
    set({
      user: userData,
      isAuthenticated: true,
      isLoading: false,
      error: null,
      userRole: role,
      isLeaderPersonalView: role === "LEADER" ? false : false,
    }),
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      userRole: null,
      isLeaderPersonalView: false,
    }),
  setLoading: loading => set({ isLoading: loading }),
  setError: error => set({ error: error, isLoading: false }),
  setUserRole: role =>
    set(state => ({
      userRole: role,
      isLeaderPersonalView:
        role === "LEADER" ? false : state.isLeaderPersonalView,
    })),
  toggleLeaderView: () =>
    set(state => {
      if (state.userRole === "LEADER") {
        return { isLeaderPersonalView: !state.isLeaderPersonalView };
      }
      return {};
    }),
}));

// 선택 사항: 스토어의 특정 부분만 선택하기 위한 셀렉터
export const selectUser = (state: AuthState) => state.user;
export const selectIsAuthenticated = (state: AuthState) =>
  state.isAuthenticated;
export const selectAuthLoading = (state: AuthState) => state.isLoading;
