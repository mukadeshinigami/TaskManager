import { createTRPCReact } from '@trpc/react-query';
import type { TrpcRouter } from '@taskmanager/backend/src/trpc';

const trpc = createTRPCReact<TrpcRouter>();