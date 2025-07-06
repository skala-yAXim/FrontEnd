import { StaticsUserType } from "@/types/dashboardType";
import { StackedBarChartData } from "@/types/statisticsType";

const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const safe = (v: any) => (typeof v === "number" ? v : 0);

export function transformToWeeklyTotal(
  weeklyData: StaticsUserType[]
): StaticsUserType {
  if (!weeklyData || weeklyData.length === 0) {
    return {
      report_date: "",
      teams: { post: 0, reply: 0 },
      docs: { docx: 0, xlsx: 0, pptx: 0, etc: 0 },
      email: { receive: 0, send: 0 },
      git: { pull_request: 0, commit: 0, issue: 0 },
    };
  }

  return weeklyData.reduce((total, daily) => ({
    report_date: "weekly_total",
    teams: {
      post: total.teams.post + safe(daily.teams.post),
      reply: total.teams.reply + safe(daily.teams.reply),
    },
    docs: {
      docx: total.docs.docx + safe(daily.docs.docx),
      xlsx: total.docs.xlsx + safe(daily.docs.xlsx),
      pptx: total.docs.pptx + safe(daily.docs.pptx),
      etc: total.docs.etc + safe(daily.docs.etc),
    },
    email: {
      receive: total.email.receive + safe(daily.email.receive),
      send: total.email.send + safe(daily.email.send),
    },
    git: {
      pull_request: total.git.pull_request + safe(daily.git.pull_request),
      commit: total.git.commit + safe(daily.git.commit),
      issue: total.git.issue + safe(daily.git.issue),
    },
  }));
}

export function transformToTypeBasedChart(
  actualData: StaticsUserType,
  averageData: StaticsUserType
) {
  if (!actualData || !averageData) return [];

  return [
    {
      type: "Email",
      value: (safe(actualData.email.receive) + safe(actualData.email.send)) / 7,
      avg: (safe(averageData.email.receive) + safe(averageData.email.send)) / 7,
    },
    {
      type: "Git",
      value:
        (safe(actualData.git.pull_request) +
          safe(actualData.git.commit) +
          safe(actualData.git.issue)) /
        7,
      avg:
        (safe(averageData.git.pull_request) +
          safe(averageData.git.commit) +
          safe(averageData.git.issue)) /
        7,
    },
    {
      type: "Docs",
      value:
        (safe(actualData.docs.docx) +
          safe(actualData.docs.xlsx) +
          safe(actualData.docs.etc)) /
        7,
      avg:
        (safe(averageData.docs.docx) +
          safe(averageData.docs.xlsx) +
          safe(averageData.docs.etc)) /
        7,
    },
    {
      type: "Teams",
      value: safe(actualData.teams.post) / 7,
      avg: safe(averageData.teams.post) / 7,
    },
  ];
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
      safe(item.docs.docx) + safe(item.docs.xlsx) + safe(item.docs.etc);
    summary[day].teams += safe(item.teams.post);
  });

  return weekDays.map(day => summary[day]);
}
