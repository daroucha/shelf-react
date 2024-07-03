import { styled } from 'goober'
import { $space } from 'remaster-ui'

const ProfileContent = styled('div')`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: ${$space.gap['6xl']};
  width: 100%;
`

export default ProfileContent
