import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { TrpcProvider } from './lib/trpc'
import { TaskManager } from './pages/TaskManager'
import { TaskMiniPage } from './pages/TaskMiniPage'
import { TodoPage } from './pages/TodoPage'
import { EditingTaskPage } from './pages/EditingTaskPage'
import { Layout } from './components/Layout'
import * as routes from './lib/routes'

export default function App() {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <main>   
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path={routes.TaskManagerRoutes()} element={<TaskManager />} />
              <Route path={routes.TaskMiniPageRoutes(routes.ViewTaskPageRoutes)} element={<TaskMiniPage />} />
              <Route path={routes.TodoPageRoutes()} element={<TodoPage />} />
              <Route path={routes.EditingTaskPageRoutes(routes.ViewTaskPageRoutes)} element={<EditingTaskPage />} />
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </TrpcProvider>
  )
}
