// TODO: API 연동 필요
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import React from "react";

interface TeamWeeklyCreateForm {
  year: string;
  month: string;
  week: string;
  metrics: string;
}

export default function TeamWeeklyCreatePage() {
  const router = useRouter();
  
  // 폼 상태
  const [form, setForm] = React.useState<TeamWeeklyCreateForm>({
    year: "2025",
    month: "5",
    week: "22",
    metrics: ""
  });

  // 확인 상태
  const [showConfirmCreate, setShowConfirmCreate] = React.useState(false);
  const [showConfirmCancel, setShowConfirmCancel] = React.useState(false);

  // 연도 옵션 (2024-2026)
  const yearOptions = [
    { value: "2024", label: "2024년" },
    { value: "2025", label: "2025년" },
    { value: "2026", label: "2026년" },
  ];

  // 월 옵션 (1-12월)
  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: (i + 1).toString(),
    label: `${i + 1}월`
  }));

  // 주차 옵션 (1-5주)
  const weekOptions = Array.from({ length: 5 }, (_, i) => ({
    value: (i + 1).toString(),
    label: `${i + 1}주차`
  }));

  // 폼 값 변경 핸들러
  const handleFormChange = (field: keyof TeamWeeklyCreateForm, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 텍스트 에어리어 변경 핸들러 (1000자 제한)
  const handleMetricsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 1000) {
      handleFormChange("metrics", value);
    }
  };

  // 보고서 생성 요청
  const handleCreateRequest = () => {
    setShowConfirmCreate(true);
    setShowConfirmCancel(false);
  };

  // 보고서 생성 확정
  const handleCreateConfirm = () => {
    // TODO: API 호출
    console.log("팀 위클리 보고서 생성:", form);
    
    // 생성 완료 후 목록 페이지로 이동
    router.push("/team-weekly");
  };

  // 취소 요청
  const handleCancelRequest = () => {
    setShowConfirmCancel(true);
    setShowConfirmCreate(false);
  };

  // 취소 확정
  const handleCancelConfirm = () => {
    router.push("/team-weekly");
  };

  // 확인 취소
  const handleDismissConfirm = () => {
    setShowConfirmCreate(false);
    setShowConfirmCancel(false);
  };

  // 폼 검증
  const isFormValid = form.year && form.month && form.week && form.metrics.trim();

  return (
    <div className="w-full">
      <Card className="w-full max-w-none">
        <CardHeader>
          <CardTitle>팀 위클리 보고서 정보 등록</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 확인 메시지 - 보고서 생성 */}
          {showConfirmCreate && (
            <Alert>
              <AlertDescription>
                <div className="space-y-3">
                  <p>
                    <strong>{form.year}년 {form.month}월 {form.week}주차</strong> 팀 위클리 보고서를 생성하시겠습니까?
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleCreateConfirm}>
                      생성
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleDismissConfirm}>
                      취소
                    </Button>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* 확인 메시지 - 작업 취소 */}
          {showConfirmCancel && (
            <Alert variant="destructive">
              <AlertDescription>
                <div className="space-y-3">
                  <p>작성 중인 내용이 모두 사라집니다. 정말 취소하시겠습니까?</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="destructive" onClick={handleCancelConfirm}>
                      취소
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleDismissConfirm}>
                      계속 작성
                    </Button>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* 주차 설정 */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">주차 설정</Label>
            <div className="grid grid-cols-3 gap-4">
              {/* 연도 선택 */}
              <div className="space-y-2">
                <Label htmlFor="year">연도</Label>
                <Select value={form.year} onValueChange={(value) => handleFormChange("year", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="연도 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {yearOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 월 선택 */}
              <div className="space-y-2">
                <Label htmlFor="month">월</Label>
                <Select value={form.month} onValueChange={(value) => handleFormChange("month", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="월 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {monthOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 주차 선택 */}
              <div className="space-y-2">
                <Label htmlFor="week">주차</Label>
                <Select value={form.week} onValueChange={(value) => handleFormChange("week", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="주차 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {weekOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* 주요 업무 지표 입력 */}
          <div className="space-y-2">
            <Label htmlFor="metrics" className="text-base font-semibold">
              주요 업무 지표
            </Label>
            <Textarea
              id="metrics"
              placeholder="팀의 주요 업무 지표를 입력해주세요..."
              value={form.metrics}
              onChange={handleMetricsChange}
              className="min-h-[200px] resize-none"
            />
            <div className="flex justify-end text-sm text-muted-foreground">
              {form.metrics.length}/1000
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleCancelRequest}
            >
              취소
            </Button>
            <Button
              onClick={handleCreateRequest}
              disabled={!isFormValid || showConfirmCreate || showConfirmCancel}
            >
              보고서 생성
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
