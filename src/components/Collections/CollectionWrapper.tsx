import { styled } from 'goober'
import { $space, $size } from 'remaster-ui'

const CollectionWrapper = styled('div')`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: ${$space.gap.xl};
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

export default CollectionWrapper
