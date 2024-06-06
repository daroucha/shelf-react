import { styled } from 'goober'
import { $space } from 'remaster-ui'

const LoginBox = styled('div')`
  display: flex;
  flex-direction: column;
  gap: ${$space.block.xxl};
  padding-block: ${$space.block['4xl']};
  padding-inline: ${$space.inline.xxl};
  width: 30svw;
`

export default LoginBox
