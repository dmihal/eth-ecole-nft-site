import React from 'react'
import { normalize } from 'polished'
import { createGlobalStyle, css } from 'styled-components'


import Head from './Head'
import Header from './Header'
import { useWeb3React } from '@web3-react/core'
import { DefaultProviderName } from 'src/constants'
import { useEffect } from 'react'
import { network } from 'src/utils/web3'

const styles = css`
  ${normalize()}
  * {
    box-sizing: border-box;
    font-family: 'ClearSans', Helvetica, sans-serif;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul,
  ol {
    margin: 0;
    padding: 0;
  }
`

const GlobalStyle = createGlobalStyle`
  ${styles}
`

const SiteLayout = ({ pageMeta, children }) => {
  const defaultContext = useWeb3React(DefaultProviderName)
  useEffect(() => {
    defaultContext.activate(network)
  }, [])

  return (
    <React.Fragment>
      <GlobalStyle />
      <Head {...pageMeta} />
      <Header />
      <main>{children}</main>
    </React.Fragment>
  )
}

export default SiteLayout