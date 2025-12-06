import './App.css'
import { TrpcProvider } from './lib/trpc'
import { TaskManager } from './pages/TaskManager'
import { TaskMiniPage } from './pages/TaskMiniPage'

export default function App() {
  return (
    <TrpcProvider>
      <TaskManager />
      <TaskMiniPage />
    </TrpcProvider>
  )
}
