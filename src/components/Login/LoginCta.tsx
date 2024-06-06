import { styled } from 'goober'
import {
  $color,
  $primitives,
  $size,
  $space,
  SansSerif,
} from 'remaster-ui'

const LoginCta = styled(SansSerif)`
  align-items: center;
  color: ${$color.text.plain.secondary.light};
  display: flex;
  flex-direction: row;
  font-size: ${$size.type.fontSize.text.sm};
  font-weight: ${$primitives.typography.fontWeight.sans.regular};
  gap: ${$space.gap.xs};
  justify-content: center;
  line-height: ${$size.type.lineHeight.text.sm};
`

export default LoginCta
