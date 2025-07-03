import { useManagerWeeklyFilterStore } from "@/store/filterStore";
import { useEffect, useState } from "react";

// 타입 정의
interface DateRangeFilterReturn {
  tempStartDate: Date | undefined;
  tempEndDate: Date | undefined;
  setTempStartDate: (date: Date | undefined) => void;
  setTempEndDate: (date: Date | undefined) => void;
  applyStartDate: (date: Date | undefined) => void;
  applyEndDate: (date: Date | undefined) => void;
  currentStartDate: string;
  currentEndDate: string;
}

export const useDateRangeFilter = (): DateRangeFilterReturn => {
  const { startDate, endDate, setDateRange } = useManagerWeeklyFilterStore();

  // 임시 상태 (달력에서 선택 중인 날짜)
  const [tempStartDate, setTempStartDate] = useState<Date | undefined>(
    startDate ? new Date(startDate) : undefined
  );
  const [tempEndDate, setTempEndDate] = useState<Date | undefined>(
    endDate ? new Date(endDate) : undefined
  );

  // Store 값 변경 시 temp 상태 동기화
  useEffect(() => {
    if (startDate) {
      setTempStartDate(new Date(startDate));
    }
  }, [startDate]);

  useEffect(() => {
    if (endDate) {
      setTempEndDate(new Date(endDate));
    }
  }, [endDate]);

  // 시작일 적용 (달력 닫힐 때)
  const applyStartDate = (date: Date | undefined) => {
    if (date) {
      const dateString = date.toISOString().split("T")[0];
      setDateRange(dateString, endDate);
      setTempStartDate(date);
    }
  };

  // 종료일 적용 (달력 닫힐 때)
  const applyEndDate = (date: Date | undefined) => {
    if (date) {
      const dateString = date.toISOString().split("T")[0];
      setDateRange(startDate, dateString);
      setTempEndDate(date);
    }
  };

  return {
    tempStartDate,
    tempEndDate,
    setTempStartDate,
    setTempEndDate,
    applyStartDate,
    applyEndDate,
    currentStartDate: startDate,
    currentEndDate: endDate,
  };
};
