import { styled } from 'goober'
import { $color, $primitives, $size, SansSerif } from 'remaster-ui'

const ProfileText = styled(SansSerif)`
  color: ${$color.text.plain.secondary.light};
  display: block;
  font-size: ${$size.type.fontSize.text.md};
  font-weight: ${$primitives.typography.fontWeight.sans.regular};
  line-height: ${$size.type.lineHeight.text.md};
  margin: 0;
  padding: 0;
`

export default ProfileText
