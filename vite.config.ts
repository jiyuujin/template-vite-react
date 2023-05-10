import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import fs from 'fs'

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd()),
  }

  return defineConfig({
    plugins: [react(), svgr()],
    server: {
      https: {
        cert: fs.readFileSync('./certificates/localhost.pem'),
        key: fs.readFileSync('./certificates/localhost-key.pem'),
      },
    },
  })
}
