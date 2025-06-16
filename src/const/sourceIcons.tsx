import { IconType } from "@/types/iconType";
import {
  FileText,
  Github,
  Mail,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

export const SOURCE_ICONS: Record<IconType, React.ReactNode> = {
  GIT: <Github className='w-4 h-4' />,
  DOCS: <FileText className='w-4 h-4' />,
  EMAIL: <Mail className='w-4 h-4' />,
  TEAMS: <Users className='w-4 h-4' />,
  TREND_UP: <TrendingUp className='w-4 h-4 text-green-500' />,
  TREND_DOWN: <TrendingDown className='w-4 h-4 text-red-500' />,
} as const;
