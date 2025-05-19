export enum STATUS {
  COMPLETED = "COMPLETED",
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
}

export enum ROLE {
  USER = "USER",
  ADMIN = "ADMIN",
}

export enum PRIORITY {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export type User = {
    name: string;
    id: string;
    username: string;
    email: string;
    password: string;
    role: ROLE;
    createdAt: Date;
    updatedAt: Date;
}

export type Task = {
    id: string;
    title: string;
    description: string | null;
    status: STATUS;
    priority: PRIORITY;
    dueDate: Date | null;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}