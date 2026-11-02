import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { store } from './store'
import { ThemeProvider } from './context/ThemeContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            className: '!bg-surface !text-txt-main !border !border-edge !shadow-lg !rounded-xl !text-sm',
          }}
        />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
