import { Card, CardContent } from "@/components/ui/card";
import { FC } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

interface TeamWeeklyReportProps {
  reportMd: string;
}

const TeamWeeklyReport: FC<TeamWeeklyReportProps> = ({ reportMd }) => {
  if (!reportMd) {
    return (
      <Card className='my-6'>
        <CardContent className='p-6'>
          <p className='text-center text-muted-foreground'>
            보고서 내용이 없습니다.
          </p>
        </CardContent>
      </Card>
    );
  }

  console.log(reportMd);
  return (
    <div className='prose prose-slate dark:prose-invert max-w-none'>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className='text-2xl font-bold mt-10 mb-4' {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className='text-xl font-bold mt-10 mb-4' {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className='text-lg font-bold mt-10 mb-4' {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className='text-base font-bold mt-10 mb-4' {...props} />
          ),
          p: ({ node, ...props }) => <p className='my-2' {...props} />,
          ul: ({ node, ...props }) => (
            <ul className='list-disc pl-6 my-2' {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className='list-decimal pl-6 my-2' {...props} />
          ),
          li: ({ node, ...props }) => <li className='my-3' {...props} />,
          a: ({ node, ...props }) => (
            <a className='text-blue-600 hover:underline' {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              className='border-l-4 border-gray-300 pl-4 italic my-4'
              {...props}
            />
          ),
          code: ({ node, ...props }) => (
            <code
              className='block bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto my-4'
              {...props}
            />
          ),
          hr: () => (
            <hr className='my-6 border-t border-gray-300 dark:border-gray-700' />
          ),
          table: ({ node, ...props }) => (
            <div className='overflow-x-auto my-6'>
              <table
                className='min-w-full divide-y divide-gray-300 dark:divide-gray-700'
                {...props}
              />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className='bg-gray-50 dark:bg-gray-800' {...props} />
          ),
          tbody: ({ node, ...props }) => (
            <tbody
              className='divide-y divide-gray-200 dark:divide-gray-800'
              {...props}
            />
          ),
          th: ({ node, ...props }) => (
            <th
              className='px-3 py-2 text-left text-sm font-semibold'
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td className='px-3 py-2 text-sm' {...props} />
          ),
        }}
      >
        {reportMd}
      </ReactMarkdown>
    </div>
  );
};

export default TeamWeeklyReport;
