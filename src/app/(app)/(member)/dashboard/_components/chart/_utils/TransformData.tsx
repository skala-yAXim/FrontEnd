import { ChartData, DataItem } from "@/types/statisticsType";

const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export function transformChartData(
  actualData: DataItem[],
  averageData: DataItem[]
): ChartData {
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
