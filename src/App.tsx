import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './assets/styles/themes/themes'
import { GlobalStyle } from './assets/styles/global'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { CyclesContextProvider } from './contexts/CyclesContex'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle></GlobalStyle>
    </ThemeProvider>
  )
}
