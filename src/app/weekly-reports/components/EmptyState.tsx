'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Plus } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  showAction?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = '위클리 보고서가 없습니다',
  description = '아직 생성된 위클리 보고서가 없습니다. 새로운 보고서를 생성해보세요.',
  actionLabel = '새 보고서 생성',
  onAction,
  showAction = true,
}) => {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-12 px-6 text-center">
        <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
          <FileText className="w-6 h-6 text-muted-foreground" />
        </div>
        
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {title}
        </h3>
        
        <p className="text-muted-foreground mb-6 max-w-md">
          {description}
        </p>
        
        {showAction && onAction && (
          <Button onClick={onAction} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default EmptyState;
