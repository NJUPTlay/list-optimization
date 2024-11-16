import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import TestVirtual from './components/fixed-virtual-scroll/test.tsx'
import TileRendering from './components/TileRendering/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div style={{display:'flex',flexDirection:'column'}}>
      <App />
      <TileRendering />
      <TestVirtual/>
    </div>
  </StrictMode>,
)
