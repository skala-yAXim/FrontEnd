import { create } from "zustand";

const SIDEBAR_COOKIE_NAME = "sidebar_state"; // sidebar.tsx에서 가져옴
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // sidebar.tsx에서 가져옴

export type SidebarVariant = "default" | "inset" | "drawer"; // 예시 variant 타입
export type SidebarDirection = "left" | "right"; // 예시 direction 타입
export type SidebarUiState = "expanded" | "collapsed"; // Context에서 가져온 UI 상태

interface SidebarState {
  isOpen: boolean; // 데스크탑용 열림/닫힘 (Context의 open)
  isOpenMobile: boolean; // 모바일용 열림/닫힘 (Context의 openMobile)
  isMobileView: boolean; // 현재 뷰가 모바일인지 (Context의 isMobile)
  uiState: SidebarUiState; // "expanded" | "collapsed" (isOpen 기반으로 파생 가능)
  variant: SidebarVariant;
  direction: SidebarDirection;

  // Callback for controlled component pattern
  onOpenChangeCallback?: (open: boolean) => void;

  // Actions
  setOpen: (open: boolean) => void;
  setOpenMobile: (openMobile: boolean) => void;
  setIsMobileView: (isMobile: boolean) => void; // isMobile 상태 설정 함수
  toggleDesktopSidebar: () => void; // 데스크탑 사이드바 토글 (주로 setOpen 사용)
  toggleMobileSidebar: () => void; // 모바일 사이드바 토글 (주로 setOpenMobile 사용)

  setVariant: (variant: SidebarVariant) => void;
  setDirection: (direction: SidebarDirection) => void;
  setOnOpenChangeCallback: (callback?: (open: boolean) => void) => void;
  loadOpenStateFromCookie: () => void; // 쿠키에서 상태 로드 액션
}

export const useSidebarStore = create<SidebarState>((set, get) => ({
  isOpen: false, // 데스크탑 사이드바는 기본적으로 닫힘 (또는 true로 시작할 수도 있음)
  isOpenMobile: false, // 모바일 사이드바는 기본적으로 닫힘
  isMobileView: false, // 초기값은 false, 실제 뷰포트 감지 로직 필요
  uiState: "collapsed", // isOpen에 따라 파생되거나, 직접 설정될 수 있음
  variant: "default", // 기본 variant
  direction: "left", // 기본 direction
  onOpenChangeCallback: undefined,

  setOnOpenChangeCallback: callback => set({ onOpenChangeCallback: callback }),

  setOpen: open => {
    if (typeof document !== "undefined") {
      // Ensure document is defined (for SSR safety)
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${open}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    }
    get().onOpenChangeCallback?.(open);
    set({ isOpen: open, uiState: open ? "expanded" : "collapsed" });
  },
  setOpenMobile: openMobile => set({ isOpenMobile: openMobile }),
  setIsMobileView: isMobile => set({ isMobileView: isMobile }),

  toggleDesktopSidebar: () => {
    const newIsOpen = !get().isOpen;
    get().setOpen(newIsOpen); // setOpen을 통해 쿠키 및 콜백 처리
  },
  toggleMobileSidebar: () =>
    set(state => ({ isOpenMobile: !state.isOpenMobile })),

  setVariant: variant => set({ variant }),
  setDirection: direction => set({ direction }),

  loadOpenStateFromCookie: () => {
    if (typeof document !== "undefined") {
      const cookieValue = document.cookie
        .split("; ")
        .find(row => row.startsWith(`${SIDEBAR_COOKIE_NAME}=`))
        ?.split("=")[1];
      if (cookieValue) {
        const openState = cookieValue === "true";
        // setOpen을 직접 호출하지 않고 isOpen과 uiState만 설정하여 초기 로드 시 콜백/쿠키 재작성 방지
        set({
          isOpen: openState,
          uiState: openState ? "expanded" : "collapsed",
        });
      }
    }
  },
}));

// 스토어 초기화 시 쿠키에서 상태 로드 (클라이언트 사이드에서만 실행)
if (typeof window !== "undefined") {
  useSidebarStore.getState().loadOpenStateFromCookie();
}

// 사용 예시:
// import { useSidebarStore } from '@/store/sidebarStore';
// const { isOpen, toggleSidebar, variant } = useSidebarStore();

// 파생 상태를 위한 셀렉터 (옵션)
// export const selectUiState = (state: SidebarState) => state.isOpen ? "expanded" : "collapsed";
