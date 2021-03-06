import styled from 'styled-components'
import { breakpoints, colors } from 'src/theme'

export const _Wrapper = styled.div`
  display: flex;
  margin-top: 10em;
  padding-left: 15px;
  padding-right: 15px;
  @media (min-width: ${breakpoints.md}) {
    padding-left: 95px;
    padding-right: 95px;
  }
`
export const _Container = styled.div<any>`
  max-width: 1680px;
  margin: 0 auto;
  ${({ thin }) => !thin && 'padding-left: 18px'};
  ${({ thin }) => !thin && 'padding-right: 18px'};
  @media (min-width: ${breakpoints.md}) {
    ${({ thin }) => !thin && 'padding-left: 60px'};
    ${({ thin }) => !thin && 'padding-right: 60px'};
  }
  @media (min-width: ${breakpoints.lg}) {
    ${({ thin }) => !thin && 'padding-left: 95px'};
    ${({ thin }) => !thin && 'padding-right: 95px'};
  }
`

export const _Input = styled.input`
  border: 1px solid ${colors.gray};
  border-radius: 4px;
  padding: 10px 8px;
  margin-bottom: 0.5em;
`

export const _CheckboxInput = styled.input`
  margin-right: 1em;
  background: ${colors.red};
`

