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
    id: String('task-1'),
    title: String('Sample Task'),
    description: String('This is a sample task description.'),
    status: 'todo',
  },
  {
    id: String('task-2'),
    title: String('Another Task'),
    description: String('This is another task description.'),
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