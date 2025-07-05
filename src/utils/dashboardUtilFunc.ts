import { StaticsTeamType, StaticsUserType } from "@/types/dashboardType";
import { getSourceIcon } from "./getSourceIcon";

// 카드에 들어갈 데이터 타입
export type DashboardCard = {
  title: string;
  description: string;
  value: string;
  badge: string;
  badgeIcon?: React.ReactNode;
  trend: string;
  trendIcon?: React.ReactNode;
  subtext?: string;
};

// 백분율 계산 유틸 함수
export const calculatePercent = (mine: number, total: number): number =>
  total > 0 ? Math.round((mine / total) * 100) : 0;

// Git 관련 카드 데이터 생성
export function getGitCards(data?: StaticsUserType): DashboardCard[] {
  const commit = data?.git?.commit ?? 0;
  const pullRequest = data?.git?.pull_request ?? 0;
  const issue = data?.git?.issue ?? 0;

  return [
    {
      title: "Commit 활동",
      description: "일주일 간 활동 수",
      value: `${commit}개`,
      badge: `${commit}`,
      badgeIcon: getSourceIcon("GIT"),
      trend: `${calculatePercent(commit, commit)}%`,
      trendIcon: getSourceIcon("GIT"),
    },
    {
      title: "Pull Request 활동",
      description: "일주일 간 활동 수",
      value: `${pullRequest}개`,
      badge: `${pullRequest}`,
      badgeIcon: getSourceIcon("GIT"),
      trend: `${calculatePercent(pullRequest, pullRequest)}%`,
      trendIcon: getSourceIcon("GIT"),
    },
    {
      title: "Issue 활동",
      description: "일주일 간 활동 수",
      value: `${issue}개`,
      badge: `${issue}`,
      badgeIcon: getSourceIcon("GIT"),
      trend: `${calculatePercent(issue, issue)}%`,
      trendIcon: getSourceIcon("GIT"),
    },
  ];
}

// 문서 관련 카드 데이터 생성
export function getDocsCards(data: StaticsUserType): DashboardCard[] {
  const docx = data?.docs.docx ?? 0;
  const xlsx = data?.docs.xlsx ?? 0;
  const pptx = data?.docs.pptx ?? 0;
  const etc = data?.docs.etc ?? 0;

  return [
    {
      title: "Word 문서",
      description: "일주일 간 활동 수",
      value: `${docx}개`,
      badge: `${docx}`,
      badgeIcon: getSourceIcon("DOCS"),
      trend: `${calculatePercent(docx, docx)}%`,
      trendIcon: getSourceIcon("DOCS"),
    },
    {
      title: "Excel 문서",
      description: "일주일 간 활동 수",
      value: `${xlsx}개`,
      badge: `${xlsx}`,
      badgeIcon: getSourceIcon("DOCS"),
      trend: `${calculatePercent(xlsx, xlsx)}%`,
      trendIcon: getSourceIcon("DOCS"),
    },
    {
      title: "PPT 문서",
      description: "일주일 간 활동 수",
      value: `${pptx}개`,
      badge: `${pptx}`,
      badgeIcon: getSourceIcon("DOCS"),
      trend: `${calculatePercent(pptx, pptx)}%`,
      trendIcon: getSourceIcon("DOCS"),
    },
    {
      title: "기타 문서",
      description: "일주일 간 활동 수",
      value: `${etc}개`,
      badge: `${etc}`,
      badgeIcon: getSourceIcon("DOCS"),
      trend: `${calculatePercent(etc, etc)}%`,
      trendIcon: getSourceIcon("DOCS"),
    },
  ];
}

// 이메일 관련 카드 데이터 생성
export function getEmailCards(data: StaticsUserType): DashboardCard[] {
  const receive = data?.email.receive ?? 0;
  const send = data?.email.send ?? 0;

  return [
    {
      title: "수신 메일",
      description: "일주일 간 활동 수",
      value: `${receive}개`,
      badge: `${receive}`,
      badgeIcon: getSourceIcon("EMAIL"),
      trend: `${calculatePercent(receive, receive)}%`,
      trendIcon: getSourceIcon("EMAIL"),
    },
    {
      title: "발신 메일",
      description: "일주일 간 활동 수",
      value: `${send}개`,
      badge: `${send}`,
      badgeIcon: getSourceIcon("EMAIL"),
      trend: `${calculatePercent(send, send)}%`,
      trendIcon: getSourceIcon("EMAIL"),
    },
  ];
}

// Teams 관련 카드 데이터 생성
export function getTeamsCards(data: StaticsUserType): DashboardCard[] {
  const post = data?.teams.post ?? 0;
  const reply = data?.teams?.reply ?? 0;

  return [
    {
      title: "Teams 포스트와 답글",
      description: "일주일 간 활동 수",
      value: `${post + reply}개`,
      badge: `${post}`,
      badgeIcon: getSourceIcon("TEAMS"),
      trend: `${calculatePercent(post, post)}%`,
      trendIcon: getSourceIcon("TEAMS"),
    },
  ];
}

// 모든 카드 데이터를 하나의 배열로 합치는 함수
export function getAllCards(data: StaticsUserType): DashboardCard[] {
  return [
    ...getGitCards(data),
    ...getDocsCards(data),
    ...getEmailCards(data),
    ...getTeamsCards(data),
  ];
}

// 기타 문서를 제외한 카드 데이터를 반환하는 함수
export function getFilteredCards(data: StaticsUserType): DashboardCard[] {
  const gitCards = getGitCards(data);
  const docsCards = getDocsCards(data).filter(
    card => card.title !== "기타 문서"
  );
  const emailCards = getEmailCards(data);
  const teamsCards = getTeamsCards(data);

  return [...gitCards, ...docsCards, ...emailCards, ...teamsCards];
}

// 팀 대시보드 관련 유틸리티 함수들

// 팀 Git 활동 카드
export function getTeamGitCards(
  current: StaticsTeamType,
  avg: StaticsTeamType
): DashboardCard[] {
  const commit = current?.git?.commit ?? 0;
  const commitAvg = avg?.git?.commit ?? 0;
  const pullRequest = current?.git?.pull_request ?? 0;
  const pullRequestAvg = avg?.git?.pull_request ?? 0;
  const issue = current?.git?.issue ?? 0;
  const issueAvg = avg?.git?.issue ?? 0;

  const percentage = (curr: number, average: number) =>
    average > 0 ? Math.round((curr / average) * 100) : 100;

  return [
    {
      title: "팀 Commit 활동",
      description: "주간 팀 전체 활동",
      value: `${commit}개`,
      badge: `${commit}`,
      badgeIcon: getSourceIcon("GIT"),
      trend: `${percentage(commit, commitAvg)}%`,
      trendIcon: getSourceIcon("GIT"),
      subtext: `평균 대비 ${percentage(commit, commitAvg)}%`,
    },
    {
      title: "팀 Pull Request",
      description: "주간 팀 전체 활동",
      value: `${pullRequest}개`,
      badge: `${pullRequest}`,
      badgeIcon: getSourceIcon("GIT"),
      trend: `${percentage(pullRequest, pullRequestAvg)}%`,
      trendIcon: getSourceIcon("GIT"),
      subtext: `평균 대비 ${percentage(pullRequest, pullRequestAvg)}%`,
    },
    {
      title: "팀 Issue 활동",
      description: "주간 팀 전체 활동",
      value: `${issue}개`,
      badge: `${issue}`,
      badgeIcon: getSourceIcon("GIT"),
      trend: `${percentage(issue, issueAvg)}%`,
      trendIcon: getSourceIcon("GIT"),
      subtext: `평균 대비 ${percentage(issue, issueAvg)}%`,
    },
  ];
}

// 팀 문서 활동 카드
export function getTeamDocsCards(
  current: StaticsTeamType,
  avg: StaticsTeamType
): DashboardCard[] {
  const docx = current?.docs?.docx ?? 0;
  const docxAvg = avg?.docs?.docx ?? 0;
  const xlsx = current?.docs?.xlsx ?? 0;
  const xlsxAvg = avg?.docs?.xlsx ?? 0;
  const pptx = current?.docs?.pptx ?? 0;
  const pptxAvg = avg?.docs?.pptx ?? 0;
  const etc = current?.docs?.etc ?? 0;
  const etcAvg = avg?.docs?.etc ?? 0;

  const percentage = (curr: number, average: number) =>
    average > 0 ? Math.round((curr / average) * 100) : 100;

  return [
    {
      title: "팀 Word 문서",
      description: "주간 팀 전체 활동",
      value: `${docx}개`,
      badge: `${docx}`,
      badgeIcon: getSourceIcon("DOCS"),
      trend: `${percentage(docx, docxAvg)}%`,
      trendIcon: getSourceIcon("DOCS"),
      subtext: `평균 대비 ${percentage(docx, docxAvg)}%`,
    },
    {
      title: "팀 Excel 문서",
      description: "주간 팀 전체 활동",
      value: `${xlsx}개`,
      badge: `${xlsx}`,
      badgeIcon: getSourceIcon("DOCS"),
      trend: `${percentage(xlsx, xlsxAvg)}%`,
      trendIcon: getSourceIcon("DOCS"),
      subtext: `평균 대비 ${percentage(xlsx, xlsxAvg)}%`,
    },
    {
      title: "팀 PowerPoint",
      description: "주간 팀 전체 활동",
      value: `${pptx}개`,
      badge: `${pptx}`,
      badgeIcon: getSourceIcon("DOCS"),
      trend: `${percentage(pptx, pptxAvg)}%`,
      trendIcon: getSourceIcon("DOCS"),
      subtext: `평균 대비 ${percentage(pptx, pptxAvg)}%`,
    },
    {
      title: "팀 기타 문서",
      description: "주간 팀 전체 활동",
      value: `${etc}개`,
      badge: `${etc}`,
      badgeIcon: getSourceIcon("DOCS"),
      trend: `${percentage(etc, etcAvg)}%`,
      trendIcon: getSourceIcon("DOCS"),
      subtext: `평균 대비 ${percentage(etc, etcAvg)}%`,
    },
  ];
}

// 팀 이메일 활동 카드
export function getTeamEmailCards(
  current: StaticsTeamType,
  avg: StaticsTeamType
): DashboardCard[] {
  const receive = current?.email?.receive ?? 0;
  const receiveAvg = avg?.email?.receive ?? 0;
  const send = current?.email?.send ?? 0;
  const sendAvg = avg?.email?.send ?? 0;

  const percentage = (curr: number, average: number) =>
    average > 0 ? Math.round((curr / average) * 100) : 100;

  return [
    {
      title: "팀 수신 메일",
      description: "주간 팀 전체 활동",
      value: `${receive}개`,
      badge: `${receive}`,
      badgeIcon: getSourceIcon("EMAIL"),
      trend: `${percentage(receive, receiveAvg)}%`,
      trendIcon: getSourceIcon("EMAIL"),
      subtext: `평균 대비 ${percentage(receive, receiveAvg)}%`,
    },
    {
      title: "팀 발신 메일",
      description: "주간 팀 전체 활동",
      value: `${send}개`,
      badge: `${send}`,
      badgeIcon: getSourceIcon("EMAIL"),
      trend: `${percentage(send, sendAvg)}%`,
      trendIcon: getSourceIcon("EMAIL"),
      subtext: `평균 대비 ${percentage(send, sendAvg)}%`,
    },
  ];
}

// 팀 Teams 활동 카드
export function getTeamTeamsCards(
  current: StaticsTeamType,
  avg: StaticsTeamType
): DashboardCard[] {
  const post = current?.teams?.post ?? 0;
  const postAvg = avg?.teams?.post ?? 0;
  const reply = current?.teams?.reply ?? 0;
  const replyAvg = avg?.teams?.reply ?? 0;

  const percentage = (curr: number, average: number) =>
    average > 0 ? Math.round((curr / average) * 100) : 100;

  return [
    {
      title: "팀 Teams 포스트와 답글",
      description: "주간 팀 전체 활동",
      value: `${post + reply}개`,
      badge: `${post}`,
      badgeIcon: getSourceIcon("TEAMS"),
      trend: `${percentage(post, postAvg)}%`,
      trendIcon: getSourceIcon("TEAMS"),
      subtext: `평균 대비 ${percentage(post, postAvg)}%`,
    },
  ];
}

// 모든 팀 카드 데이터를 하나의 배열로 합치는 함수
export function getAllTeamCards(
  current: StaticsTeamType,
  avg: StaticsTeamType
): DashboardCard[] {
  return [
    ...getTeamGitCards(current, avg),
    ...getTeamDocsCards(current, avg),
    ...getTeamEmailCards(current, avg),
    ...getTeamTeamsCards(current, avg),
  ];
}

// 기타 문서를 제외한 팀 카드 데이터를 반환하는 함수
export function getFilteredTeamCards(
  current: StaticsTeamType,
  avg: StaticsTeamType
): DashboardCard[] {
  const gitCards = getTeamGitCards(current, avg);
  const docsCards = getTeamDocsCards(current, avg).filter(
    card => !card.title.includes("기타")
  );
  const emailCards = getTeamEmailCards(current, avg);
  const teamsCards = getTeamTeamsCards(current, avg);

  return [...gitCards, ...docsCards, ...emailCards, ...teamsCards];
}
