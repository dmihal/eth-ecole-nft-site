import styled from 'styled-components'

import { _Wrapper, _Container } from './styles'

export const Title = styled.h2`
  margin: 2em 0em 0.5em 0em;
`

const InfoSection = () => {
  return (
    <div>
      <Title>How it works</Title>
      <p>The ticket is a Polygon NFT. To purchase your ticket you'll need to switch to Polygon, and purchase the NFT using Polygon Dai. The price for the ticket is 10DAI, which gives you one entry to the conferance.</p>
      <p>To enter the conferance, we'll use the name you added to you NFT for reference. Make sure this is the same as your ID. If you sell this ticket to someone else, they can go to this site and change the name.</p>
    </div>
  )
}

export default InfoSection
