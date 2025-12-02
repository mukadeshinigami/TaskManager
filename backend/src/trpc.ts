import { initTRPC } from "@trpc/server";

type TaskStatus = 'todo' | 'progress' | 'review' | 'done';

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export const tasks: Task[] = [
  {
    id: 'task-1',
    title: 'Sample Task',
    description: 'This is a sample task description.',
    status: 'todo',
  },
  {
    id: 'task-2',
    title: 'Another Task',
    description: 'This is another task description.',
    status: 'todo',
  },
];

const trpc = initTRPC.create();

export const trpcRouter = trpc.router({
  tasks: trpc.procedure.query(() => {
        return {tasks};
    }),
  hello : trpc.procedure.query(() => {
    return 'Hello from tRPC backend!';
  }),

});

export type TrpcRouter = typeof trpcRouter;