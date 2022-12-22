import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './lib/Router'
import { useEffect, useState } from 'react'
import { Loading } from './components/Loading'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timingDelayInSeconds = 1000 * 4

    const delay = setTimeout(() => {
      setIsLoading(false)
    }, timingDelayInSeconds)

    return () => {
      clearTimeout(delay)
    }
  }, [])

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle></GlobalStyle>
      {isLoading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <Router></Router>
        </BrowserRouter>
      )}
    </ThemeProvider>
  )
}

export default App
