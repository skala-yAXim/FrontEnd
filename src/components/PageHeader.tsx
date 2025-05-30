import React from "react";
import { CardHeader, CardTitle } from "./ui/card";

interface SectionHeaderProps {
  title: string;
  description?: string;
  buttonElement?: React.ReactNode;
}

export default function SectionHeader({
  title,
  description,
  buttonElement,
}: SectionHeaderProps) {
  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && (
            <p className="mt-1 mt-2 text-sm text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
        {buttonElement && <div>{buttonElement}</div>}
      </div>
    </CardHeader>
  );
}
