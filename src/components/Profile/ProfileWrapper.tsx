import { styled } from 'goober'
import { $size, $space } from 'remaster-ui'

const ProfileWrapper = styled('div')`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 20svw 1fr;
  gap: ${$space.gap['4xl']};
  margin-inline: auto;
  padding-block: ${$space.block.xxl};

  @media only screen and (${$size.query.mobile}) {
    width: 100svw;
  }

  @media only screen and (${$size.query.tablet}) {
    width: 80svw;
  }

  @media only screen and (${$size.query.desktop}) {
    width: 80svw;
  }
`

export default ProfileWrapper
