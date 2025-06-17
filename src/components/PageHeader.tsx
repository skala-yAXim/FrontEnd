import React from "react";
import { CardHeader, CardTitle } from "./ui/card";

interface SectionHeaderProps {
  title: string;
  description?: string;
  buttonElement?: React.ReactNode;
}

export default function PageHeader({
  title,
  description,
  buttonElement,
}: SectionHeaderProps) {
  return (
    <CardHeader>
      <div className='flex items-center justify-between my-6'>
        <div>
          <CardTitle className='text-2xl font-bold'>{title}</CardTitle>
          {description && (
            <p className='mt-2 text-sm text-muted-foreground dark:text-gray-400'>
              {description}
            </p>
          )}
        </div>
        {buttonElement && <div>{buttonElement}</div>}
      </div>
    </CardHeader>
  );
}
