import { StaticsUserType } from "@/types/dashboardType";
import {
  MultipleBarChartData,
  StackedBarChartData,
} from "@/types/statisticsType";

const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const safe = (v: any) => (typeof v === "number" ? v : 0);

export function transformToAvgChartData(
  actualData: StaticsUserType[],
  averageData: StaticsUserType[]
): MultipleBarChartData {
  return {
    email: actualData.map((item, idx) => {
      const day = weekDays[new Date(item.report_date).getDay()];
      const value = safe(item.email.receive) + safe(item.email.send);
      const avg =
        safe(averageData[idx].email.receive) +
        safe(averageData[idx].email.send);
      return { day, email: value, avg };
    }),

    git: actualData.map((item, idx) => {
      const day = weekDays[new Date(item.report_date).getDay()];
      const value =
        safe(item.git.pull_request) +
        safe(item.git.commit) +
        safe(item.git.issue);
      const avg =
        safe(averageData[idx].git.pull_request) +
        safe(averageData[idx].git.commit) +
        safe(averageData[idx].git.issue);
      return { day, git: value, avg };
    }),

    docs: actualData.map((item, idx) => {
      const day = weekDays[new Date(item.report_date).getDay()];
      const value =
        safe(item.docs.docx) +
        safe(item.docs.xlsx) +
        safe(item.docs.txt) +
        safe(item.docs.etc);
      const avg =
        safe(averageData[idx].docs.docx) +
        safe(averageData[idx].docs.xlsx) +
        safe(averageData[idx].docs.txt) +
        safe(averageData[idx].docs.etc);
      return { day, docs: value, avg };
    }),

    teams: actualData.map((item, idx) => {
      const day = weekDays[new Date(item.report_date).getDay()];
      const value = safe(item.teams.post);
      const avg = safe(averageData[idx].teams.post);
      return { day, teams: value, avg };
    }),
  };
}

export function aggregateToWeekdayChart(
  data: StaticsUserType[]
): StackedBarChartData[] {
  // 초기화된 주간 데이터 (일 ~ 토)
  const summary: Record<string, StackedBarChartData> = weekDays.reduce(
    (acc, day) => {
      acc[day] = { day, email: 0, git: 0, docs: 0, teams: 0 };
      return acc;
    },
    {} as Record<string, StackedBarChartData>
  );

  data.forEach(item => {
    const day = weekDays[new Date(item.report_date).getDay()];

    summary[day].email += safe(item.email.receive) + safe(item.email.send);
    summary[day].git +=
      safe(item.git.pull_request) +
      safe(item.git.commit) +
      safe(item.git.issue);
    summary[day].docs +=
      safe(item.docs.docx) +
      safe(item.docs.xlsx) +
      safe(item.docs.txt) +
      safe(item.docs.etc);
    summary[day].teams += safe(item.teams.post);
  });

  return weekDays.map(day => summary[day]);
}
