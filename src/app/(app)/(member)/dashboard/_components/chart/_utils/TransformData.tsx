import {
  DataItem,
  MultipleBarChartData,
  StackedBarChartData,
} from "@/types/statisticsType";

const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export function transformToAvgChartData(
  actualData: DataItem[],
  averageData: DataItem[]
): MultipleBarChartData {
  return {
    email: actualData.map((item, idx) => {
      const day = weekDays[new Date(item.report_date).getDay()];
      const value = item.email.receive + item.email.send;
      const avg = averageData[idx].email.receive + averageData[idx].email.send;
      return { day, email: value, avg };
    }),

    git: actualData.map((item, idx) => {
      const day = weekDays[new Date(item.report_date).getDay()];
      const value = item.git.pull_request + item.git.commit + item.git.issue;
      const avg =
        averageData[idx].git.pull_request +
        averageData[idx].git.commit +
        averageData[idx].git.issue;
      return { day, git: value, avg };
    }),

    docs: actualData.map((item, idx) => {
      const day = weekDays[new Date(item.report_date).getDay()];
      const value =
        item.docs.docx + item.docs.xlsx + item.docs.txt + item.docs.etc;
      const avg =
        averageData[idx].docs.docx +
        averageData[idx].docs.xlsx +
        averageData[idx].docs.txt +
        averageData[idx].docs.etc;
      return { day, docs: value, avg };
    }),

    teams: actualData.map((item, idx) => {
      const day = weekDays[new Date(item.report_date).getDay()];
      const value = item.teams.post;
      const avg = averageData[idx].teams.post;
      return { day, teams: value, avg };
    }),
  };
}

export function aggregateToWeekdayChart(
  data: DataItem[]
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

    summary[day].email += item.email.receive + item.email.send;
    summary[day].git +=
      item.git.pull_request + item.git.commit + item.git.issue;
    summary[day].docs +=
      item.docs.docx + item.docs.xlsx + item.docs.txt + item.docs.etc;
    summary[day].teams += item.teams.post;
  });

  return weekDays.map(day => summary[day]);
}
