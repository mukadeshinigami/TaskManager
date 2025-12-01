import React from 'react'
import './App.css'
import { TrpcProvider } from './lib/trpc'
import { TaskManager } from './pages/TaskManager'

export default function App() {
  return (
    <TrpcProvider>
      <TaskManager />
    </TrpcProvider>
  );
}
