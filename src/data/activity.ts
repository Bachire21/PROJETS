export type ActivityLogEntry = {
  id: string;
  user: string;
  action: string;
  target: string;
  date: string;
  status: string;
};

export const seedActivityLog: ActivityLogEntry[] = [];