import styled from 'styled-components'

import { _Wrapper, _Container } from './styles'

export const NavigateBack = styled.a`
`
export const Title = styled.h1`
  margin: 0.5em 0em;
`

const HeadlineSection = () => {
  return (
    <div>
      <NavigateBack href="https://www.ethecole.com">← Back to main site</NavigateBack>
      <Title>Buy Your Eth École Ticket</Title>
    </div>
  )
}

export default HeadlineSection
