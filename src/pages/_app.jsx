import Router from 'next/router'
import dynamic from 'next/dynamic'
import '../styles/globals.css'
import FullPageLoader from '@components/Invoice/FullPageLoader'
import { LoggedInLayout } from '../layouts/LoggedIn'

function App({ Component, pageProps: { session, ...pageProps }, router: { route } }) {
  return (
    <div>
      <LoggedInLayout>
        <Component {...pageProps} />
      </LoggedInLayout>
    </div>
  )
}

export default App
