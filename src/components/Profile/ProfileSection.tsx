import { styled } from 'goober'
import { $space } from 'remaster-ui'

const ProfileSection = styled('div')`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 0;
  gap: ${$space.gap.xl};
  width: 100%;
`

export default ProfileSection
