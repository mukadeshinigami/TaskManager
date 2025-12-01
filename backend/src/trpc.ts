import { initTRPC } from "@trpc/server";

const tasks = [
  {
    id: 'task-1',
    title: 'Sample Task',
    description: 'This is a sample task description.',
    status: 'todo', // Possible values: 'todo', 'progress', 'review', 'done'
  },
  {
    id: 'task-2',
    title: 'Another Task',
    description: 'This is another task description.',
    status: 'todo', // Possible values: 'todo', 'progress', 'review', 'done'
  },
]

const trpc = initTRPC.create();

export const trpcRouter = trpc.router({
    hello: trpc.procedure.query(() => {
        return {tasks};
    }),
});

export type TrpcRouter = typeof trpcRouter;