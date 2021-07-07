import styled from 'styled-components'
import { colors, gradients } from 'src/theme'

const ButtonElement = styled.button<any>`
  ${({ shadow }) => shadow && 'box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.13);'};
  padding: ${({ thin }) => (thin ? '5px 8px' : '8px 20px')};
  font-size: 19px;
  line-height: 26px;
  border-radius: 6px;
  text-transform: ${({ uppercase }) => (!uppercase ? 'none' : 'uppercase')};
  border-width: 1px;
  border-style: solid;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  transition: all ease 0.5s;
`

export const RedButton = styled(ButtonElement)<any>`
  color: ${colors.white};
  background: ${colors.red};
  border-color: ${colors.red};
  ${({ disabled }) =>
    !disabled &&
    `&:hover {
      background: ${colors.redder};
      border-color: ${colors.redder};
    }`}
`

export const GrayButton = styled(ButtonElement)<any>`
  color: ${colors.white};
  background: ${colors.gray};
  border-color: ${colors.white};
  ${({ disabled }) =>
    !disabled &&
    `&:hover {
      color: ${colors.gray};
      background: ${colors.lightGray};
    }`}
`

export const WhiteButton = styled(ButtonElement)<any>`
  color: ${colors.black};
  background: ${colors.white};
  border-color: ${colors.red};
  ${({ disabled }) =>
    !disabled &&
    `&:hover {
      color: ${colors.white};
      background: ${colors.red};
    }`}
`

export const PinkButton = styled(ButtonElement)<any>`
  color: ${colors.white};
  background: ${colors.pink};
  border-color: ${colors.red};
  ${({ disabled }) =>
    !disabled &&
    `&:hover {
      background: ${colors.redder};
    }`}
`

export const GreenButton = styled(ButtonElement)<any>`
  color: ${colors.white};
  background: ${colors.lime};
  border-color: ${colors.green};
  ${({ disabled }) =>
    !disabled &&
    `&:hover {
      background: ${colors.green};
    }`}
`

export const DiscordButton = styled(ButtonElement)<any>`
  color: ${colors.white};
  background: ${colors.discord};
  border-color: ${colors.white};
  ${({ disabled }) =>
    !disabled &&
    `&:hover {
      color: ${colors.discord};
      background: ${colors.white};
    }`}
`

export const GradientButton = styled(ButtonElement)<any>`
  color: ${colors.white};
  background: ${gradients.grayred};
  border-color: ${colors.white};
  ${({ disabled }) =>
    !disabled &&
    `&:hover {
      background: ${gradients.black};
    }`}
`

const Button = ({
  theme = 'red',
  thin = false,
  shadow = false,
  disabled = false,
  children,
  ...restProps
}) => {
  if ('green' === theme)
    return (
      <GreenButton
        thin={thin}
        shadow={shadow}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </GreenButton>
    )
  if ('pink' === theme)
    return (
      <PinkButton
        thin={thin}
        shadow={shadow}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </PinkButton>
    )
  if ('white' === theme)
    return (
      <WhiteButton
        thin={thin}
        shadow={shadow}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </WhiteButton>
    )
  if ('discord' === theme)
    return (
      <DiscordButton
        thin={thin}
        shadow={shadow}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </DiscordButton>
    )
  if ('gray' === theme)
    return (
      <GrayButton
        thin={thin}
        shadow={shadow}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </GrayButton>
    )
  if ('gradient' === theme)
    return (
      <GradientButton
        thin={thin}
        shadow={shadow}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </GradientButton>
    )
  return (
    <RedButton thin={thin} shadow={shadow} disabled={disabled} {...restProps}>
      {children}
    </RedButton>
  )
}

export default Button
