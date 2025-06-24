export interface TeamInfoType {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  weeklyTemplate: string;
}

export interface TeamComment {
  comment: string;
}

export interface TeamMember {
  id: number;
  name: string;
  email: string;
}
