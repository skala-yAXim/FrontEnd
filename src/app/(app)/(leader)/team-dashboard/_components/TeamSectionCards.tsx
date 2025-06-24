"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetDashboardTeamAvg,
  useGetStaticsTeamWeek,
} from "@/hooks/useTeamDashboardQueries";
import { StaticsTeamType } from "@/types/dashboardType";
import { getSourceIcon } from "@/utils/getSourceIcon";
import { motion } from "framer-motion";
import { CarouselCard } from "./chart/CarouselCard";

export function TeamSectionCards() {
  const { data: teamWeek, isLoading, isError } = useGetStaticsTeamWeek();
  const { data: teamAvg } = useGetDashboardTeamAvg();

  if (isLoading) {
    return (
      <motion.div
        className='grid grid-cols-1 gap-6 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className='h-[200px] rounded-xl overflow-hidden'
          >
            <Card className='h-full border-0 shadow-md bg-gradient-to-br from-background to-muted/30'>
              <CardHeader className='pb-0'>
                <Skeleton className='h-4 w-24 mb-2' />
                <Skeleton className='h-8 w-16 mb-2' />
                <Skeleton className='h-6 w-10' />
              </CardHeader>
              <CardFooter className='mt-auto'>
                <Skeleton className='h-4 w-32' />
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (isError || !teamWeek) {
    return (
      <div className='px-4 lg:px-6'>
        <Card className='border-0 bg-destructive/10 text-destructive'>
          <CardHeader>
            <CardTitle>데이터를 불러올 수 없습니다</CardTitle>
            <CardDescription className='text-destructive/80'>
              잠시 후 다시 시도해주세요
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const avgData = teamAvg?.[0] || teamWeek; // 평균 데이터가 없으면 현재 데이터 사용

  return (
    <motion.div
      className='grid grid-cols-1 gap-6 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <CarouselCard cards={getTeamGitCards(teamWeek, avgData)} />
      <CarouselCard cards={getTeamDocsCards(teamWeek, avgData)} />
      <CarouselCard cards={getTeamEmailCards(teamWeek, avgData)} />
      <CarouselCard cards={getTeamTeamsCards(teamWeek, avgData)} />
    </motion.div>
  );
}

// 팀 Git 활동 카드
function getTeamGitCards(current: StaticsTeamType, avg: StaticsTeamType) {
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
function getTeamDocsCards(current: StaticsTeamType, avg: StaticsTeamType) {
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
function getTeamEmailCards(current: StaticsTeamType, avg: StaticsTeamType) {
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
function getTeamTeamsCards(current: StaticsTeamType, avg: StaticsTeamType) {
  const post = current?.teams?.post ?? 0;
  const postAvg = avg?.teams?.post ?? 0;
  const reply = current?.teams?.reply ?? 0;
  const replyAvg = avg?.teams?.reply ?? 0;

  const percentage = (curr: number, average: number) =>
    average > 0 ? Math.round((curr / average) * 100) : 100;

  return [
    {
      title: "팀 Teams 포스트",
      description: "주간 팀 전체 활동",
      value: `${post}개`,
      badge: `${post}`,
      badgeIcon: getSourceIcon("TEAMS"),
      trend: `${percentage(post, postAvg)}%`,
      trendIcon: getSourceIcon("TEAMS"),
      subtext: `평균 대비 ${percentage(post, postAvg)}%`,
    },
    {
      title: "팀 Teams 답글",
      description: "주간 팀 전체 활동",
      value: `${reply}개`,
      badge: `${reply}`,
      badgeIcon: getSourceIcon("TEAMS"),
      trend: `${percentage(reply, replyAvg)}%`,
      trendIcon: getSourceIcon("TEAMS"),
      subtext: `평균 대비 ${percentage(reply, replyAvg)}%`,
    },
  ];
}
