import {
  DocsType,
  EmailType,
  GitType,
  StaticsUserType,
  TeamsType,
} from "@/types/dashboardType";
import {
  MultipleBarChartData,
  StackedBarChartData,
} from "@/types/statisticsType";

const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const emptyTeamsType: TeamsType = { post: 0, reply: 0 };
const emptyDocsType: DocsType = { docx: 0, xlsx: 0, pptx: 0, etc: 0 };
const emptyEmailType: EmailType = { receive: 0, send: 0 };
const emptyGitType: GitType = { pull_request: 0, commit: 0, issue: 0 };

const safe = (v: any) => (typeof v === "number" ? v : 0);

export function transformToAvgChartData(
  actualData: StaticsUserType[],
  averageData: StaticsUserType[]
): MultipleBarChartData {
  return {
    email: actualData.map((item, idx) => {
      const day = weekDays[new Date(item.report_date).getDay()];
      const value = safe(item.email.receive) + safe(item.email.send);
      const avg = value / 2;
      return { day, email: value, avg };
    }),

    git: actualData.map((item, idx) => {
      const day = weekDays[new Date(item.report_date).getDay()];
      const value =
        safe(item.git.pull_request) +
        safe(item.git.commit) +
        safe(item.git.issue);
      const avg = value / 3;
      return { day, git: value, avg };
    }),

    docs: actualData.map((item, idx) => {
      const day = weekDays[new Date(item.report_date).getDay()];
      const value =
        safe(item.docs.docx) + safe(item.docs.xlsx) + safe(item.docs.etc);
      const avg = value / 3;
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

export function transformToTypeBasedChart(
  actualData: StaticsUserType,
  averageData: StaticsUserType
) {
  // 특정 날짜(예: 가장 최근 날짜)의 데이터를 사용
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
