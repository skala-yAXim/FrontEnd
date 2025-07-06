import { format, subWeeks } from "date-fns";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface FilterState {
  selectedMembers: string[];
  startDate: string;
  endDate: string;
}

interface ManagerWeeklyFilterState extends FilterState {
  // Actions
  setSelectedMembers: (members: string[]) => void;
  addMember: (memberId: string) => void;
  removeMember: (memberId: string) => void;
  setDateRange: (startDate: string, endDate: string) => void;
  resetFilters: () => void;

  // Computed
  hasActiveFilters: () => boolean;
}

const defaultFilters: FilterState = {
  selectedMembers: [],
  startDate: format(subWeeks(new Date(), 1), "yyyy-MM-dd"),
  endDate: format(new Date(), "yyyy-MM-dd"),
};

export const useManagerWeeklyFilterStore = create(
  persist<ManagerWeeklyFilterState>(
    (set, get) => ({
      ...defaultFilters,

      setSelectedMembers: members => set({ selectedMembers: members }),

      addMember: memberId =>
        set(state => ({
          selectedMembers: state.selectedMembers.includes(memberId)
            ? state.selectedMembers
            : [...state.selectedMembers, memberId],
        })),

      removeMember: memberId =>
        set(state => ({
          selectedMembers: state.selectedMembers.filter(id => id !== memberId),
        })),

      setDateRange: (startDate, endDate) => set({ startDate, endDate }),

      resetFilters: () => set(defaultFilters),

      hasActiveFilters: () => {
        const state = get();
        return (
          state.selectedMembers.length > 0 ||
          state.startDate !== defaultFilters.startDate ||
          state.endDate !== defaultFilters.endDate
        );
      },
    }),
    {
      name: "manager-weekly-filters",
      storage: createJSONStorage(() => localStorage),
      // partialize 제거 - 전체 상태 저장 (함수는 자동 제외됨)
    }
  )
);
