import {
  formatBoldText as formatBoldTextNew,
  formatToReadableList,
} from "@/utils/formatReadableText";

const renderSafeContent = (
  content: any,
  bulletSymbol: string = "•",
  marginClass: string = ""
) => {
  if (!content) {
    return (
      <p className='text-sm text-muted-foreground italic'>내용이 없습니다.</p>
    );
  }

  const contentStr = String(content).trim();
  if (!contentStr) {
    return (
      <p className='text-sm text-muted-foreground italic'>
        내용이 비어있습니다.
      </p>
    );
  }

  const formattedItems = formatToReadableList(contentStr);

  if (formattedItems.length == 0) {
    return (
      <p className='text-sm text-muted-foreground leading-relaxed'>
        {formatBoldTextNew(contentStr)}
      </p>
    );
  }

  return (
    <div className={`text-sm text-muted-foreground space-y-2 ${marginClass}`}>
      {formattedItems.map((item, idx) => (
        <div key={idx} className='pl-4 relative leading-relaxed'>
          <span className='absolute left-0 top-1 text-xs'>{bulletSymbol}</span>
          <span>{formatBoldTextNew(item)}</span>
        </div>
      ))}
    </div>
  );
};

// 섹션 헤더 렌더링 헬퍼 함수
const renderSectionHeader = (
  icon: string,
  title: string,
  subtitle?: string
) => (
  <div className='flex items-start gap-3'>
    <div className='mt-0.5 w-6 h-6 flex items-center justify-center flex-shrink-0 text-base'>
      {icon}
    </div>
    <div className='flex-1'>
      <p className='font-semibold text-popover-foreground mb-1'>{title}</p>
      {subtitle && <p className='text-sm text-muted-foreground'>{subtitle}</p>}
    </div>
  </div>
);

export { renderSafeContent, renderSectionHeader };
