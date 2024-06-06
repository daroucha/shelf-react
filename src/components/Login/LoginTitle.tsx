import { styled } from 'goober'
import {
  $color,
  $primitives,
  $size,
  SansSerif,
} from 'remaster-ui'

const LoginTitle = styled(SansSerif)`
  color: ${$color.text.title.primary.light};
  display: block;
  font-size: ${$size.type.fontSize.title.lg};
  font-weight: ${$primitives.typography.fontWeight.sans
    .bold};
  line-height: ${$size.type.lineHeight.title.sm};
  margin: 0;
  padding: 0;
`

export default LoginTitle
