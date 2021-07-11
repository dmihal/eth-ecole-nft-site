import React from 'react'
import { normalize } from 'polished'
import { createGlobalStyle, css } from 'styled-components'
import { _Wrapper, _Container, _HeadlineSection } from './styles'
import { colors } from '../theme'


import Head from './Head'
import Header from './Header'
import { useWeb3React } from '@web3-react/core'
import { DefaultProviderName } from 'src/constants'
import { useEffect } from 'react'
import { network } from 'src/utils/web3'

const styles = css`
  ${normalize()}
  @import url("https://use.typekit.net/whc0fta.css");
  * {
    box-sizing: border-box;
    font-family: 'Termina', Helvetica, sans-serif;
    background-color: ${colors.black};
    color: ${colors.white};
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
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
    text-transform: uppercase;
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
      <main>
        <_Wrapper>
          <_Container>
            {children}
          </_Container>
        </_Wrapper>
      </main>
    </React.Fragment>
  )
}

export default SiteLayout