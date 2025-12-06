import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import './App.css'
import { TrpcProvider } from './lib/trpc'
import { TaskManager } from './pages/TaskManager'
import { TaskMiniPage } from './pages/TaskMiniPage'
import { TodoPage } from './pages/TodoPage'

export default function App() {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <header className='App-header'>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/todo">To-Do</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<TaskManager />} />
            <Route path="/task/:id" element={<TaskMiniPage />} />
            <Route path="/todo" element={<TodoPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </TrpcProvider>
  )
}
