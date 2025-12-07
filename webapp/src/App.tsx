import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import './App.css'
import { TrpcProvider } from './lib/trpc'
import { TaskManager } from './pages/TaskManager'
import { TaskMiniPage } from './pages/TaskMiniPage'
import { TodoPage } from './pages/TodoPage'
import { EditingTaskPage } from './pages/EditingTaskPage'
import { Layout } from './components/Layout'
import {
  EditingTaskPageRoutes,
  TaskManagerRoutes,
  TaskMiniPageRoutes,
  TodoPageRoutes,
  ViewTaskPageRoutes,
} from './lib/routes'

export default function App() {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path={TaskManagerRoutes()} element={<TaskManager />} />
              <Route path={TaskMiniPageRoutes(ViewTaskPageRoutes)} element={<TaskMiniPage />} />
              <Route path={TodoPageRoutes()} element={<TodoPage />} />
              <Route path={EditingTaskPageRoutes(ViewTaskPageRoutes)} element={<EditingTaskPage />} />
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </TrpcProvider>
  )
}
