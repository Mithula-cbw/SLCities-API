import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import { ThemeProvider } from "@/contexts/themeContext"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppRoutes />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
