# TaskManager Backend

Type-safe backend API for Task Manager application using tRPC and Express.

## Architecture

```
backend/src/
├── index.ts                          # Express server entry point with tRPC middleware
├── lib/
│   ├── trpc.ts                       # tRPC initialization and Express adapter
│   └── create_temporary_task.ts      # Mock task data for development
└── router/
    ├── index.ts                      # Main tRPC router combining all procedures
    ├── get/
    │   └── index.ts                  # Procedure: Get single task details by ID
    └── txt/
        └── index.ts                  # Procedure: Get list of all tasks
```

## File Descriptions

### Core Files

**`src/index.ts`** - Backend Entry Point
- Initializes Express server
- Sets up CORS middleware
- Mounts tRPC middleware at `/trpc` endpoint
- Health check endpoint at `/ping`
- Listens on `http://localhost:3000/`

**`src/lib/trpc.ts`** - tRPC Configuration
- Exports base `trpc` instance for creating procedures
- Provides `applyTrpcToExpressApp()` middleware function
- Connects tRPC router to Express application

**`src/lib/create_temporary_task.ts`** - Mock Data
- Generates 10 sample tasks with mock data
- Task structure: id, title, description, FullText, status
- All tasks default to 'todo' status
- **Note**: Replace with database calls in production

### Router Files

**`src/router/index.ts`** - Main Router
- Combines all tRPC procedures into single router
- Exports `trpcRouter` instance
- Exports `TrpcRouter` type for frontend type-safety

**`src/router/txt/index.ts`** - LIST Procedure
- Endpoint: `trpc.txt()`
- Input: None
- Output: `{ tasks: Task[] }`
- Purpose: Fetch list of all tasks with basic info

**`src/router/get/index.ts`** - GET Procedure
- Endpoint: `trpc.get(taskId: string)`
- Input: Task ID (string)
- Output: Single task with full details
- Purpose: Fetch detailed task info on-demand
- Returns `null` if task not found
- **TODO**: Add auth/permission checks before returning FullText

## API Endpoints

All endpoints are accessible at `http://localhost:3000/trpc/`

### GET LIST - `/trpc/txt`
Fetch all tasks
```bash
curl http://localhost:3000/trpc/txt
```

### GET DETAILS - `/trpc/get?input="task-1"`
Fetch single task details by ID
```bash
curl 'http://localhost:3000/trpc/get?input="task-1"'
```

## Running the Backend

### Development
```bash
cd backend
pnpm dev
```

### Build
```bash
pnpm build
```

### Type Checking
```bash
pnpm type
```

## Dependencies

- **@trpc/server** - RPC framework
- **@trpc/server/adapters/express** - Express adapter for tRPC
- **express** - HTTP server framework
- **cors** - Cross-Origin Resource Sharing middleware
- **zod** - TypeScript schema validation
- **lodash** - Utility library for data generation
- **typescript** - Static type checking

## Future Improvements

1. Replace mock data with database queries (MongoDB, PostgreSQL, etc.)
2. Add authentication/authorization in context
3. Add input validation with Zod schemas
4. Add error handling middleware
5. Add logging and monitoring
6. Implement pagination for task lists
7. Add task creation/update/delete procedures
8. Add filtering and sorting to task list endpoint

## Type Safety

The backend exports `TrpcRouter` type which the frontend uses for type-safe API calls:

```typescript
// In frontend
import type { TrpcRouter } from '@taskmanager/backend'

// Full type-safety across frontend/backend boundary
trpc.txt.useQuery()  // Query typed from backend router
```

This ensures that changes to backend procedures immediately reflect in frontend with TypeScript errors.
