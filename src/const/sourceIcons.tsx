import { Evidence } from "@/types/reportType";
import { FileText, Github, Mail, Users } from "lucide-react";

export const SOURCE_ICONS: Record<Evidence["source"], React.ReactNode> = {
  GIT: <Github className='w-4 h-4' />,
  DOCS: <FileText className='w-4 h-4' />,
  EMAIL: <Mail className='w-4 h-4' />,
  TEAMS: <Users className='w-4 h-4' />,
} as const;
