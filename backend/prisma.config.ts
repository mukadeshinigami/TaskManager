import { defineConfig } from '@prisma/config'
import { config } from 'dotenv'

// Загрузить .env файл
config()

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL || '',
  },
})
