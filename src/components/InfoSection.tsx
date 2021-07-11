import styled from 'styled-components'

import ConnectWalletButton from './ConnectWalletButton'
import { _Wrapper, _Container } from './styles'
import { colors, fontStyles, breakpoints } from 'src/theme'

export const Title = styled.h2`
  margin: 2em 0em 0.5em 0em;
`

const InfoSection = () => {
  return (
    <div>
      <Title>How it works</Title>
      <p>The ticket is a Polygon NFT. To purchase your ticket you'll need to switch to Polygon, and purchase the NFT using Polygon Dai.</p>
    </div>
  )
}

export default InfoSection
