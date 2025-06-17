"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  //   CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardAction } from "@/components/ui/card-action";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetStaticsUserWeek } from "@/hooks/useDashboardQueries";
import { StaticsTeamType, StaticsUserType } from "@/types/dashboardType";
import { getSourceIcon } from "@/utils/getSourceIcon";
import { motion } from "framer-motion";
import { CarouselCard } from "./chart/CarouselCard";

const mockDataTeamWeek: StaticsTeamType = {
  git: { commit: 132, pull_request: 56, issue: 30 },
  docs: { docx: 68, xlsx: 32, txt: 3, etc: 232 },
  email: { receive: 356, send: 785 },
  teams: { post: 86 },
};

export function SectionCards() {
  const { data, isLoading, isError } = useGetStaticsUserWeek();
  // const {
  //   data: teamData,
  //   isLoading: teamLoading,
  //   isError: teamError,
  // } = useGetStaticsTeamWeek();
  const teamTotal = mockDataTeamWeek;

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

  if (isError || !data) {
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

  return (
    <motion.div
      className='grid grid-cols-1 gap-6 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <CarouselCard cards={getGitCards(data, teamTotal)} />
      <CarouselCard cards={getDocsCards(data, teamTotal)} />
      <CarouselCard cards={getEmailCards(data, teamTotal)} />
      <CarouselCard cards={getTeamsCards(data, teamTotal)} />
    </motion.div>
  );
}

// 사용 예시 (기존 코드에 맞게 조정하세요)
export function ExampleCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>카드 제목</CardTitle>
        <CardDescription>카드 설명 텍스트입니다.</CardDescription>
      </CardHeader>
      <CardAction>
        <Button variant='outline' size='sm'>
          취소
        </Button>
        <Button size='sm'>확인</Button>
      </CardAction>
      <CardFooter>
        <p>카드 푸터 영역입니다.</p>
      </CardFooter>
    </Card>
  );
}

function getGitCards(data?: StaticsUserType, teamTotal?: StaticsTeamType) {
  const commit = data?.git?.commit ?? 0;
  const commitTotal = teamTotal?.git?.commit ?? 0;
  const pullRequest = data?.git?.pull_request ?? 0;
  const pullRequestTotal = teamTotal?.git?.pull_request ?? 0;
  const issue = data?.git?.issue ?? 0;
  const issueTotal = teamTotal?.git?.issue ?? 0;

  const percent = (mine: number, total: number) =>
    total > 0 ? Math.round((mine / total) * 100) : 0;

  return [
    {
      title: "Commit 활동",
      description: "일주일 간 활동 수",
      value: `${commit}개`,
      badge: `${commit}`,
      badgeIcon: getSourceIcon("GIT"),
      trend: `${percent(commit, commitTotal)}%`,
      trendIcon: getSourceIcon("GIT"),
      subtext: `팀 내 지분 ${percent(commit, commitTotal)}%`,
    },
    {
      title: "Pull Request 활동",
      description: "일주일 간 활동 수",
      value: `${pullRequest}개`,
      badge: `${pullRequest}`,
      badgeIcon: getSourceIcon("GIT"),
      trend: `${percent(pullRequest, pullRequestTotal)}%`,
      trendIcon: getSourceIcon("GIT"),
      subtext: `팀 내 지분 ${percent(pullRequest, pullRequestTotal)}%`,
    },
    {
      title: "Issue 활동",
      description: "일주일 간 활동 수",
      value: `${issue}개`,
      badge: `${issue}`,
      badgeIcon: getSourceIcon("GIT"),
      trend: `${percent(issue, issueTotal)}%`,
      trendIcon: getSourceIcon("GIT"),
      subtext: `팀 내 지분 ${percent(issue, issueTotal)}%`,
    },
  ];
}

function getDocsCards(data: StaticsUserType, teamTotal: StaticsTeamType) {
  const docx = data?.docs.docx ?? 0;
  const docxTotal = teamTotal?.docs.docx ?? 0;
  const xlsx = data?.docs.xlsx ?? 0;
  const xlsxTotal = teamTotal?.docs.xlsx ?? 0;
  const txt = data?.docs.txt ?? 0;
  const txtTotal = teamTotal?.docs.txt ?? 0;
  const etc = data?.docs.etc ?? 0;
  const etcTotal = teamTotal?.docs.etc ?? 0;

  const percent = (mine: number, total: number) =>
    total > 0 ? Math.round((mine / total) * 100) : 0;

  return [
    {
      title: "Word 문서",
      description: "일주일 간 활동 수",
      value: `${docx}개`,
      badge: `${docx}`,
      badgeIcon: getSourceIcon("DOCS"),
      trend: `${percent(docx, docxTotal)}%`,
      trendIcon: getSourceIcon("DOCS"),
      subtext: `팀 내 지분 ${percent(docx, docxTotal)}%`,
    },
    {
      title: "Excel 문서",
      description: "일주일 간 활동 수",
      value: `${xlsx}개`,
      badge: `${xlsx}`,
      badgeIcon: getSourceIcon("DOCS"),
      trend: `${percent(xlsx, xlsxTotal)}%`,
      trendIcon: getSourceIcon("DOCS"),
      subtext: `팀 내 지분 ${percent(xlsx, xlsxTotal)}%`,
    },
    {
      title: "Text 문서",
      description: "일주일 간 활동 수",
      value: `${txt}개`,
      badge: `${txt}`,
      badgeIcon: getSourceIcon("DOCS"),
      trend: `${percent(txt, txtTotal)}%`,
      trendIcon: getSourceIcon("DOCS"),
      subtext: `팀 내 지분 ${percent(txt, txtTotal)}%`,
    },
    {
      title: "기타 문서",
      description: "일주일 간 활동 수",
      value: `${etc}개`,
      badge: `${etc}`,
      badgeIcon: getSourceIcon("DOCS"),
      trend: `${percent(etc, etcTotal)}%`,
      trendIcon: getSourceIcon("DOCS"),
      subtext: `팀 내 지분 ${percent(etc, etcTotal)}%`,
    },
  ];
}

function getEmailCards(data: StaticsUserType, teamTotal: StaticsTeamType) {
  const receive = data?.email.receive ?? 0;
  const receiveTotal = teamTotal?.email.receive ?? 0;
  const send = data?.email.send ?? 0;
  const sendTotal = teamTotal?.email.send ?? 0;

  const percent = (mine: number, total: number) =>
    total > 0 ? Math.round((mine / total) * 100) : 0;

  return [
    {
      title: "수신 메일",
      description: "일주일 간 활동 수",
      value: `${receive}개`,
      badge: `${receive}`,
      badgeIcon: getSourceIcon("EMAIL"),
      trend: `${percent(receive, receiveTotal)}%`,
      trendIcon: getSourceIcon("EMAIL"),
      subtext: `팀 내 지분 ${percent(receive, receiveTotal)}%`,
    },
    {
      title: "발신 메일",
      description: "일주일 간 활동 수",
      value: `${send}개`,
      badge: `${send}`,
      badgeIcon: getSourceIcon("EMAIL"),
      trend: `${percent(send, sendTotal)}%`,
      trendIcon: getSourceIcon("EMAIL"),
      subtext: `팀 내 지분 ${percent(send, sendTotal)}%`,
    },
  ];
}

function getTeamsCards(data: StaticsUserType, teamTotal: StaticsTeamType) {
  const post = data?.teams.post ?? 0;
  const postTotal = teamTotal?.teams.post ?? 0;

  const percent = (mine: number, total: number) =>
    total > 0 ? Math.round((mine / total) * 100) : 0;

  return [
    {
      title: "Teams 포스트",
      description: "일주일 간 활동 수",
      value: `${post}개`,
      badge: `${post}`,
      badgeIcon: getSourceIcon("TEAMS"),
      trend: `${percent(post, postTotal)}%`,
      trendIcon: getSourceIcon("TEAMS"),
      subtext: `팀 내 지분 ${percent(post, postTotal)}%`,
    },
  ];
}
