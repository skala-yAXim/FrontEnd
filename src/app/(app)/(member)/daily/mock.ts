import { DailyReportData } from "@/types/dailyReport";

export const mockDailyReports: DailyReportData[] = [
  {
    report_title: "조민서님의 2025-06-06 일일 업무 보고서",
    id: 1,
    daily_report: {
      title: "📌 일일 업무 진행 내용",
      summary:
        "오늘은 총 3개의 업무 항목 중 2건을 완료하였고 1건을 진행 중입니다.",
      contents: [
        {
          text: "**전처리 파이프라인 리팩토링(task_id: 37)** 작업을 완료하였습니다. 성능 개선 및 유지보수성을 고려하여 기존 코드 구조를 재정비하였습니다.",
          evidence: [
            {
              title:
                "조민서 updated the Status on this issue: YAX-44 전처리 파이프라인 개선",
              content: "From 해야 할 일 to 완료...",
              LLM_reference: "리팩토링 작업 완료됨을 나타냄",
            },
            {
              title:
                "조민서 updated the Status on this issue: YAX-44 전처리 파이프라인 개선",
              content: "From 해야 할 일 to 완료...",
              LLM_reference: "리팩토링 작업 완료됨을 나타냄",
            },
          ],
        },
        {
          text: "**QA 샘플 테스트 케이스 작성(task_id: 51)** 작업이 완료되었습니다. 주요 예외 케이스를 포함하여 총 20건의 테스트가 작성되었습니다.",
          evidence: [
            {
              title: "GitLab 커밋 내역",
              content: "Add 20 QA sample test cases to /tests/preprocessing",
              LLM_reference: "QA 테스트 코드 추가 확인",
            },
          ],
        },
        {
          text: "**VectorDB 검색 정확도 개선 실험(task_id: 58)** 작업은 진행 중이며, 다양한 파라미터 조합 실험을 수행하고 있습니다.",
          evidence: [
            {
              title: "조민서 commented on YAX-58",
              content: "top_k 값을 5 → 10으로 변경한 실험 결과 첨부...",
              LLM_reference: "실험 진행 중임을 나타내는 활동 기록",
            },
          ],
        },
      ],
    },
    daily_reflection: {
      title: "🔍 오늘의 회고 및 개선점",
      content: [
        "전처리 파이프라인을 리팩토링함으로써 추후 기능 추가가 쉬워졌습니다.",
        "QA 테스트 케이스를 빠르게 정리해놓아 향후 배포 안정성 확보에 기여할 수 있을 것으로 기대됩니다.",
        "VectorDB 검색 정확도 실험은 반복이 필요해 리소스 사용량을 고려한 스케줄링이 필요합니다.",
      ],
    },
  },
  {
    report_title: "조민서님의 2025-06-07 일일 업무 보고서",
    id: 2,
    daily_report: {
      title: "📌 일일 업무 진행 내용",
      summary: "오늘은 총 2개의 업무 항목을 모두 완료하였습니다.",
      contents: [
        {
          text: "**Slack 알림 연동 기능 개발(task_id: 62)** 작업을 완료하였습니다. 상태 변경 시 자동 알림 기능이 구현되어 실시간 커뮤니케이션이 가능해졌습니다.",
          evidence: [
            {
              title: "PR #103 - 슬랙 알림 기능 추가",
              content: "작업 상태 변경 감지 후 슬랙 웹훅 전송 구현",
              LLM_reference: "슬랙 연동 코드 커밋으로 기능 구현 확인됨",
            },
          ],
        },
        {
          text: "**WBS 태스크 우선순위 정렬 기능(task_id: 64)** 작업을 완료하였습니다. 중요도 및 마감일 기준으로 자동 정렬되도록 수정되었습니다.",
          evidence: [
            {
              title: "조민서 merged the branch for task priority",
              content: "Sort tasks based on deadline and weight",
              LLM_reference: "WBS 정렬 로직 완료 확인",
            },
          ],
        },
      ],
    },
    daily_reflection: {
      title: "🔍 오늘의 회고 및 개선점",
      content: [
        "슬랙 알림이 실시간 협업에 효과적이라는 피드백을 받았습니다.",
        "WBS 기능은 사용자 편의성을 높여 작업 집중도를 향상시킬 것으로 기대됩니다.",
        "다음 주에는 리팩토링 후 전체 시스템 테스트를 수행할 예정입니다.",
      ],
    },
  },
  {
    report_title: "조민서님의 2025-06-08 일일 업무 보고서",
    id: 3,
    daily_report: {
      title: "📌 일일 업무 진행 내용",
      summary:
        "오늘은 총 3개의 업무 항목 중 1건을 완료하고 2건은 미착수 상태입니다.",
      contents: [
        {
          text: "**검색 쿼리 개선을 위한 유사도 분석(task_id: 66)** 작업을 완료하였습니다. 검색 쿼리 분석을 통해 유사 문서 판단 기준을 보정했습니다.",
          evidence: [
            {
              title: "YAX-66 분석 결과 공유",
              content: "쿼리-문서 쌍간 cosine similarity 분석 완료",
              LLM_reference: "유사도 분석 결과 산출 완료",
            },
          ],
        },
        {
          text: "**데이터 백업 자동화 스크립트 작성(task_id: 69)** 작업은 착수 전이며, 이번 주 후반 착수 예정입니다.",
          evidence: [
            {
              title: "WBS 목록",
              content: "백업 스크립트 작성 예정 항목",
              LLM_reference: "WBS상 존재하나 작업 미시작 상태",
            },
          ],
        },
        {
          text: "**QA 로그 분석 시각화(task_id: 71)** 작업도 아직 착수되지 않았습니다.",
          evidence: [
            {
              title: "작업 이슈 없음",
              content: "Teams나 Git 상에서 해당 작업에 대한 활동 기록 없음",
              LLM_reference: "작업 미시작으로 판단됨",
            },
          ],
        },
      ],
    },
    daily_reflection: {
      title: "🔍 오늘의 회고 및 개선점",
      content: [
        "검색 쿼리 유사도 분석이 정확도 개선에 중요한 기반이 될 것으로 판단됩니다.",
        "남은 미착수 항목들은 일정을 고려하여 순차적으로 착수할 예정입니다.",
        "이번 주 후반에는 데이터 백업 자동화 스크립트를 우선적으로 진행하고자 합니다.",
      ],
    },
  },
  {
    report_title: "조민서님의 2025-06-09 일일 업무 보고서",
    id: 4,
    daily_report: {
      title: "📌 일일 업무 진행 내용",
      summary: "오늘은 총 3개의 업무 중 2건을 완료하고 1건은 보류 상태입니다.",
      contents: [
        {
          text: "**API 응답 캐싱 적용(task_id: 72)** 작업이 완료되었습니다. Redis를 이용한 캐싱으로 응답 속도가 개선되었습니다.",
          evidence: [
            {
              title: "PR #112 - 응답 캐싱 적용",
              content: "API 레이어에 Redis 기반 캐시 구현",
              LLM_reference: "캐싱 기능 구현 완료 확인",
            },
          ],
        },
        {
          text: "**단위 테스트 커버리지 향상(task_id: 74)** 작업이 완료되어 커버리지가 85%까지 향상되었습니다.",
          evidence: [
            {
              title: "테스트 리포트 - 커버리지",
              content: "Coverage: 85%",
              LLM_reference: "테스트 커버리지 목표 달성 확인",
            },
          ],
        },
        {
          text: "**시스템 로그 개선(task_id: 75)** 작업은 외부 로그 포맷 논의로 인해 보류되었습니다.",
          evidence: [
            {
              title: "회의록 #210",
              content: "로그 포맷 일원화 논의 중, 작업 보류",
              LLM_reference: "논의 진행 중으로 보류 상태",
            },
          ],
        },
      ],
    },
    daily_reflection: {
      title: "🔍 오늘의 회고 및 개선점",
      content: [
        "캐싱 적용으로 API 성능이 향상되어 유의미한 결과를 얻었습니다.",
        "테스트 커버리지를 높이기 위해 테스트 작성 방식에 대한 표준화가 필요합니다.",
        "로그 작업은 논의 완료 후 다음 주 재개할 예정입니다.",
      ],
    },
  },
  {
    report_title: "조민서님의 2025-06-10 일일 업무 보고서",
    id: 5,
    daily_report: {
      title: "📌 일일 업무 진행 내용",
      summary: "오늘은 총 2개의 업무 항목이 완료되었습니다.",
      contents: [
        {
          text: "**프로젝트 문서화 작업(task_id: 77)**을 완료하였습니다. README 및 개발 가이드를 최신화하였습니다.",
          evidence: [
            {
              title: "조민서 updated README.md",
              content: "Add setup guide, update dependencies",
              LLM_reference: "문서화 작업 완료 확인",
            },
          ],
        },
        {
          text: "**모듈 의존성 정리(task_id: 79)** 작업을 완료하여 빌드 속도를 개선하였습니다.",
          evidence: [
            {
              title: "YAX-79 완료",
              content: "불필요한 의존성 제거 및 모듈 정리",
              LLM_reference: "의존성 관리 작업 완료됨",
            },
          ],
        },
      ],
    },
    daily_reflection: {
      title: "🔍 오늘의 회고 및 개선점",
      content: [
        "문서화를 통해 신규 인력 온보딩이 수월해질 것으로 기대됩니다.",
        "불필요한 의존성 제거가 전체 속도 향상에 긍정적인 영향을 주었습니다.",
      ],
    },
  },
  {
    report_title: "조민서님의 2025-06-11 일일 업무 보고서",
    id: 6,
    daily_report: {
      title: "📌 일일 업무 진행 내용",
      summary: "총 3개의 업무 중 1건 완료, 2건은 진행 중입니다.",
      contents: [
        {
          text: "**모델 추론 속도 개선(task_id: 81)** 작업 완료. batch size 및 GPU 설정 최적화를 통해 개선했습니다.",
          evidence: [
            {
              title: "YAX-81 성능 테스트 결과",
              content: "추론 시간 27% 단축",
              LLM_reference: "성능 개선 결과 확인",
            },
          ],
        },
        {
          text: "**CI/CD 파이프라인 리팩토링(task_id: 83)** 작업 진행 중입니다. GitHub Actions 설정 변경 중입니다.",
          evidence: [
            {
              title: "조민서 pushed to branch ci-refactor",
              content: ".yml 설정 수정 및 테스트 중",
              LLM_reference: "작업 진행 중 확인됨",
            },
          ],
        },
        {
          text: "**서비스 상태 대시보드 구성(task_id: 84)** 진행 중. Grafana 연동 테스트 단계입니다.",
          evidence: [
            {
              title: "설정 파일 변경 기록",
              content: "Grafana 설정 json 적용 중",
              LLM_reference: "구성 작업 진행 중",
            },
          ],
        },
      ],
    },
    daily_reflection: {
      title: "🔍 오늘의 회고 및 개선점",
      content: [
        "추론 속도 개선은 전체 응답 지연 이슈 해소에 긍정적입니다.",
        "CI/CD는 병렬 처리 옵션 추가가 향후 과제로 남았습니다.",
        "대시보드는 알림 연동까지 고려하여 완성할 예정입니다.",
      ],
    },
  },
  {
    report_title: "조민서님의 2025-06-12 일일 업무 보고서",
    id: 7,
    daily_report: {
      title: "📌 일일 업무 진행 내용",
      summary: "총 2건 완료, 1건은 미착수 상태입니다.",
      contents: [
        {
          text: "**에러 로그 분류 및 필터링(task_id: 86)** 작업 완료. 로그 레벨 분리 및 주요 키워드 추출 기능 추가.",
          evidence: [
            {
              title: "에러 로그 파싱 모듈 v1.1",
              content: "WARN/ERROR 구분, 정규표현식 적용",
              LLM_reference: "필터링 기능 구현 확인",
            },
          ],
        },
        {
          text: "**사용자 피드백 수집 자동화(task_id: 88)** 작업 완료. Slack 메시지에서 설문 링크 자동 생성 및 수집 구현.",
          evidence: [
            {
              title: "YAX-88 완료",
              content: "Slack 인터페이스 구현",
              LLM_reference: "사용자 피드백 자동 수집 확인",
            },
          ],
        },
        {
          text: "**모니터링 알림 세분화(task_id: 89)** 작업은 착수 전입니다.",
          evidence: [
            {
              title: "작업 계획 문서",
              content: "알림 그룹 기준 정리 중",
              LLM_reference: "계획 수립 완료, 착수 전",
            },
          ],
        },
      ],
    },
    daily_reflection: {
      title: "🔍 오늘의 회고 및 개선점",
      content: [
        "에러 로그 필터링으로 문제 탐지 속도가 빨라졌습니다.",
        "Slack 기반 피드백 시스템이 사용자 반응 수집에 도움이 될 것으로 기대됩니다.",
      ],
    },
  },
  {
    report_title: "조민서님의 2025-06-13 일일 업무 보고서",
    id: 8,
    daily_report: {
      title: "📌 일일 업무 진행 내용",
      summary: "1건 완료, 2건 보류 중입니다.",
      contents: [
        {
          text: "**ML 모델 버전 관리 도입(task_id: 91)** 작업 완료. 모델 레지스트리 시스템 적용 시작.",
          evidence: [
            {
              title: "모델 레지스트리 설정 완료",
              content: "mlflow 기반 버전 관리",
              LLM_reference: "버전 관리 기능 적용 확인",
            },
          ],
        },
        {
          text: "**문서 OCR 성능 비교 실험(task_id: 92)** 보류됨. 라이선스 이슈로 외부 API 사용 불가.",
          evidence: [
            {
              title: "기술 검토 문서",
              content: "API 사용 제한 사항 명시",
              LLM_reference: "외부 제약으로 인해 보류 결정",
            },
          ],
        },
        {
          text: "**워크플로우 자동화(task_id: 94)** 보류됨. 스케줄러 논의 필요.",
          evidence: [
            {
              title: "회의록 #220",
              content: "Airflow vs Prefect 논의 중",
              LLM_reference: "결정 대기 중",
            },
          ],
        },
      ],
    },
    daily_reflection: {
      title: "🔍 오늘의 회고 및 개선점",
      content: [
        "ML 모델 버전 관리 도입은 실험 재현성과 배포 안정성에 매우 유익했습니다.",
        "OCR 실험은 라이선스 우회 방안을 검토해볼 필요가 있습니다.",
      ],
    },
  },
  {
    report_title: "조민서님의 2025-06-14 일일 업무 보고서",
    id: 9,
    daily_report: {
      title: "📌 일일 업무 진행 내용",
      summary: "3건 모두 완료되었습니다.",
      contents: [
        {
          text: "**권한 관리 시스템 개선(task_id: 96)** 작업 완료. 사용자 역할 기반 접근 제어 강화.",
          evidence: [
            {
              title: "PR #130 - RBAC 적용",
              content: "관리자/일반 사용자 권한 분리",
              LLM_reference: "권한 관리 기능 확인",
            },
          ],
        },
        {
          text: "**데이터 적재 로깅 기능 추가(task_id: 97)** 작업 완료. 적재 이력 DB에 기록.",
          evidence: [
            {
              title: "로그 테이블 생성",
              content: "적재 시점, 데이터량 기록",
              LLM_reference: "적재 기록 기능 구현됨",
            },
          ],
        },
        {
          text: "**프론트엔드 뷰 개선(task_id: 99)** 작업 완료. 컴포넌트 정리 및 스타일 리팩토링.",
          evidence: [
            {
              title: "커밋: UI 개선",
              content: "Button, Card 재구성",
              LLM_reference: "프론트뷰 개선 확인",
            },
          ],
        },
      ],
    },
    daily_reflection: {
      title: "🔍 오늘의 회고 및 개선점",
      content: [
        "권한 관리 시스템 개편으로 보안성이 향상되었습니다.",
        "프론트엔드 개선으로 사용자 경험이 개선될 것으로 기대됩니다.",
      ],
    },
  },
  {
    report_title: "조민서님의 2025-06-15 일일 업무 보고서",
    id: 10,
    daily_report: {
      title: "📌 일일 업무 진행 내용",
      summary: "총 2건 완료, 1건 진행 중입니다.",
      contents: [
        {
          text: "**테스트 자동화 도입(task_id: 102)** 완료. Jest 기반 테스트 실행 및 리포트 자동화.",
          evidence: [
            {
              title: "CI 테스트 리포트 자동 생성",
              content: "Jest 실행 후 html 리포트 자동 첨부",
              LLM_reference: "테스트 자동화 구현 확인",
            },
          ],
        },
        {
          text: "**데이터 정합성 검증(task_id: 104)** 완료. 누락된 항목 탐지 및 비교 검증 로직 추가.",
          evidence: [
            {
              title: "정합성 테스트 코드",
              content: "source vs target 비교 코드 작성",
              LLM_reference: "데이터 검증 기능 완료",
            },
          ],
        },
        {
          text: "**모바일 뷰 최적화(task_id: 105)** 작업 진행 중. 반응형 레이아웃 개선 중.",
          evidence: [
            {
              title: "커밋: 반응형 UI 적용",
              content: "Tailwind 기준 breakpoint 추가",
              LLM_reference: "UI 개선 진행 중",
            },
          ],
        },
      ],
    },
    daily_reflection: {
      title: "🔍 오늘의 회고 및 개선점",
      content: [
        "자동화된 테스트가 릴리즈 신뢰도를 높이는 데 크게 기여할 것입니다.",
        "모바일 최적화는 사용자 피드백을 수렴하여 추가 개선이 필요합니다.",
      ],
    },
  },
  {
    report_title: "조민서님의 2025-06-15 일일 업무 보고서",
    id: 11,
    daily_report: {
      title: "📌 일일 업무 진행 내용",
      summary: "총 2건 완료, 1건 진행 중입니다.",
      contents: [
        {
          text: "**테스트 자동화 도입(task_id: 102)** 완료. Jest 기반 테스트 실행 및 리포트 자동화.",
          evidence: [
            {
              title: "CI 테스트 리포트 자동 생성",
              content: "Jest 실행 후 html 리포트 자동 첨부",
              LLM_reference: "테스트 자동화 구현 확인",
            },
          ],
        },
        {
          text: "**데이터 정합성 검증(task_id: 104)** 완료. 누락된 항목 탐지 및 비교 검증 로직 추가.",
          evidence: [
            {
              title: "정합성 테스트 코드",
              content: "source vs target 비교 코드 작성",
              LLM_reference: "데이터 검증 기능 완료",
            },
          ],
        },
        {
          text: "**모바일 뷰 최적화(task_id: 105)** 작업 진행 중. 반응형 레이아웃 개선 중.",
          evidence: [
            {
              title: "커밋: 반응형 UI 적용",
              content: "Tailwind 기준 breakpoint 추가",
              LLM_reference: "UI 개선 진행 중",
            },
          ],
        },
      ],
    },
    daily_reflection: {
      title: "🔍 오늘의 회고 및 개선점",
      content: [
        "자동화된 테스트가 릴리즈 신뢰도를 높이는 데 크게 기여할 것입니다.",
        "모바일 최적화는 사용자 피드백을 수렴하여 추가 개선이 필요합니다.",
      ],
    },
  },
  {
    report_title: "조민서님의 2025-06-15 일일 업무 보고서",
    id: 12,
    daily_report: {
      title: "📌 일일 업무 진행 내용",
      summary: "총 2건 완료, 1건 진행 중입니다.",
      contents: [
        {
          text: "**테스트 자동화 도입(task_id: 102)** 완료. Jest 기반 테스트 실행 및 리포트 자동화.",
          evidence: [
            {
              title: "CI 테스트 리포트 자동 생성",
              content: "Jest 실행 후 html 리포트 자동 첨부",
              LLM_reference: "테스트 자동화 구현 확인",
            },
          ],
        },
        {
          text: "**데이터 정합성 검증(task_id: 104)** 완료. 누락된 항목 탐지 및 비교 검증 로직 추가.",
          evidence: [
            {
              title: "정합성 테스트 코드",
              content: "source vs target 비교 코드 작성",
              LLM_reference: "데이터 검증 기능 완료",
            },
          ],
        },
        {
          text: "**모바일 뷰 최적화(task_id: 105)** 작업 진행 중. 반응형 레이아웃 개선 중.",
          evidence: [
            {
              title: "커밋: 반응형 UI 적용",
              content: "Tailwind 기준 breakpoint 추가",
              LLM_reference: "UI 개선 진행 중",
            },
          ],
        },
      ],
    },
    daily_reflection: {
      title: "🔍 오늘의 회고 및 개선점",
      content: [
        "자동화된 테스트가 릴리즈 신뢰도를 높이는 데 크게 기여할 것입니다.",
        "모바일 최적화는 사용자 피드백을 수렴하여 추가 개선이 필요합니다.",
      ],
    },
  },
  {
    report_title: "조민서님의 2025-06-15 일일 업무 보고서",
    id: 13,
    daily_report: {
      title: "📌 일일 업무 진행 내용",
      summary: "총 2건 완료, 1건 진행 중입니다.",
      contents: [
        {
          text: "**테스트 자동화 도입(task_id: 102)** 완료. Jest 기반 테스트 실행 및 리포트 자동화.",
          evidence: [
            {
              title: "CI 테스트 리포트 자동 생성",
              content: "Jest 실행 후 html 리포트 자동 첨부",
              LLM_reference: "테스트 자동화 구현 확인",
            },
          ],
        },
        {
          text: "**데이터 정합성 검증(task_id: 104)** 완료. 누락된 항목 탐지 및 비교 검증 로직 추가.",
          evidence: [
            {
              title: "정합성 테스트 코드",
              content: "source vs target 비교 코드 작성",
              LLM_reference: "데이터 검증 기능 완료",
            },
          ],
        },
        {
          text: "**모바일 뷰 최적화(task_id: 105)** 작업 진행 중. 반응형 레이아웃 개선 중.",
          evidence: [
            {
              title: "커밋: 반응형 UI 적용",
              content: "Tailwind 기준 breakpoint 추가",
              LLM_reference: "UI 개선 진행 중",
            },
          ],
        },
      ],
    },
    daily_reflection: {
      title: "🔍 오늘의 회고 및 개선점",
      content: [
        "자동화된 테스트가 릴리즈 신뢰도를 높이는 데 크게 기여할 것입니다.",
        "모바일 최적화는 사용자 피드백을 수렴하여 추가 개선이 필요합니다.",
      ],
    },
  },
];
