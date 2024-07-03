import { styled } from 'goober'
import { $space } from 'remaster-ui'

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  gap: ${$space.gap.lg};
  width: 20svw;
`

const Options = styled('div')`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-inline: ${$space.inline.sm};
  width: 100%;
`

const Loading = styled('div')`
  align-items: center;
  display: flex;
  justify-content: center;
`

const Input = styled('div')`
  display: none;
`

interface PropsProfileImageFile {
  children: React.ReactNode
}

function ProfileImageFile({ children }: PropsProfileImageFile) {
  return <Wrapper>{children}</Wrapper>
}

ProfileImageFile.Options = Options
ProfileImageFile.Loading = Loading
ProfileImageFile.Input = Input

export default ProfileImageFile
