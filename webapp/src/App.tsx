import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import './App.css'
import { TrpcProvider } from './lib/trpc'
import { TaskManager } from './pages/TaskManager'
import { TaskMiniPage } from './pages/TaskMiniPage'
import { TodoPage } from './pages/TodoPage'
import { EditingTaskPage } from './pages/EditingTaskPage'
import { EditingTaskPageRoutes, TaskManagerRoutes, TaskMiniPageRoutes, TodoPageRoutes } from './lib/routes'

export default function App() {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <header className="App-header">
          <nav>
            <Link to={TaskManagerRoutes()}>Home</Link>
            <Link to={TodoPageRoutes()}>To-Do</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path={TaskManagerRoutes()} element={<TaskManager />} />S
            <Route path={TaskMiniPageRoutes(':id')} element={<TaskMiniPage />} />
            <Route path={TodoPageRoutes()} element={<TodoPage />} />
            <Route path={EditingTaskPageRoutes(':id')} element={<EditingTaskPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </TrpcProvider>
  )
}
