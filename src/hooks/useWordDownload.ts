// Framework First: 브라우저에서 MD → 간결한 한국식 보고서 변환
import { AlignmentType, Document, Packer, Paragraph, TextRun } from "docx";
import { marked } from "marked";
import { toast } from "sonner";

interface UseWordDownloadOptions {
  filename?: string;
}

export function useWordDownload(options?: UseWordDownloadOptions) {
  const downloadWord = async (
    markdownContent: string,
    customFilename?: string
  ) => {
    try {
      // 파일명 생성
      const filename =
        customFilename ||
        options?.filename ||
        `report_${new Date().toISOString().split("T")[0]}.docx`;

      // 마크다운을 HTML로 변환
      const htmlContent = await marked(markdownContent);

      // HTML을 구조화된 데이터로 파싱
      const reportData = parseReportData(htmlContent);

      // 간결한 한국식 Word 문서 생성
      const doc = new Document({
        sections: [
          {
            properties: {
              page: {
                margin: {
                  top: 1440, // 2cm
                  right: 1440, // 2cm
                  bottom: 1440, // 2cm
                  left: 1440, // 2cm
                },
              },
            },
            children: [
              // 제목만 심플하게
              new Paragraph({
                children: [
                  new TextRun({
                    text: "주간 업무 보고서",
                    bold: true,
                    size: 28,
                  }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 600 },
              }),

              // 빈 줄
              new Paragraph({
                children: [new TextRun({ text: "" })],
                spacing: { after: 200 },
              }),

              // 각 섹션을 심플하게
              ...createSimpleSection("주요 성과", reportData.achievements),
              ...createSimpleSection("진행 중인 작업", reportData.currentWork),
              ...createSimpleSection("다음 주 계획", reportData.nextWeekPlan),
              ...createSimpleSection("이슈 및 차단 요소", reportData.issues),
              ...createSimpleSection(
                "팀 멤버 활동",
                reportData.teamMembers.map(m => `${m.name}: ${m.activity}`)
              ),
            ],
          },
        ],
      });

      // Word 문서를 Blob으로 변환
      const blob = await Packer.toBlob(doc);

      // 다운로드 실행
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;

      document.body.appendChild(link);
      link.click();

      // 정리
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Word 문서가 다운로드되었습니다!");
    } catch (error) {
      console.error("Word 다운로드 오류:", error);
      toast.error("다운로드 중 오류가 발생했습니다.");
    }
  };

  return { downloadWord };
}

// 보고서 데이터 구조
interface ReportData {
  achievements: string[];
  currentWork: string[];
  nextWeekPlan: string[];
  issues: string[];
  teamMembers: { name: string; activity: string }[];
}

// HTML을 구조화된 보고서 데이터로 파싱
function parseReportData(html: string): ReportData {
  const data: ReportData = {
    achievements: [],
    currentWork: [],
    nextWeekPlan: [],
    issues: [],
    teamMembers: [],
  };

  const lines = html.split("\n").filter(line => line.trim());
  let currentSection = "";

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine.includes("주요 성과")) {
      currentSection = "achievements";
    } else if (trimmedLine.includes("진행 중인 작업")) {
      currentSection = "currentWork";
    } else if (trimmedLine.includes("다음 주 계획")) {
      currentSection = "nextWeekPlan";
    } else if (trimmedLine.includes("이슈 및 차단 요소")) {
      currentSection = "issues";
    } else if (trimmedLine.includes("팀 멤버 활동")) {
      currentSection = "teamMembers";
    } else if (trimmedLine.startsWith("<li>")) {
      const text = trimmedLine.replace(/<\/?li>/g, "").replace(/<[^>]*>/g, "");
      if (text && currentSection !== "teamMembers") {
        data[currentSection as keyof Omit<ReportData, "teamMembers">].push(
          text
        );
      } else if (text && currentSection === "teamMembers") {
        const match = text.match(/^([^:]+):\s*(.+)$/);
        if (match) {
          data.teamMembers.push({
            name: match[1].trim(),
            activity: match[2].trim(),
          });
        }
      }
    }
  }

  return data;
}

// 완전 심플한 섹션 생성 - 첨부 이미지 스타일
function createSimpleSection(title: string, items: string[]): Paragraph[] {
  const elements: Paragraph[] = [];

  // 섹션 제목 - 볼드만
  elements.push(
    new Paragraph({
      children: [
        new TextRun({
          text: title,
          bold: true,
          size: 24,
        }),
      ],
      spacing: { before: 400, after: 200 },
    })
  );

  // 섹션 내용 - 들여쓰기만
  if (items.length === 0) {
    elements.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "해당 없음",
            size: 22,
          }),
        ],
        indent: { left: 360 },
        spacing: { after: 200 },
      })
    );
  } else {
    items.forEach(item => {
      elements.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `• ${item}`,
              size: 22,
            }),
          ],
          indent: { left: 360 },
          spacing: { after: 150 },
        })
      );
    });
  }

  return elements;
}
