import { styled } from 'goober'
import {
  SansSerif,
  $color,
  $size,
  $primitives,
  $space,
} from 'remaster-ui'

const ModalContent = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  width: 55vw;
`

const Banner = styled('div')`
  display: block;
`

const Content = styled('div')`
  align-content: stretch;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: ${$space.gap['4xl']};
  padding-block: ${$space.block.xxl};
  padding-inline: ${$space.inline.xl};
  width: 100%;
`

const ContentTitle = styled(SansSerif)`
  color: ${$color.text.title.primary.light};
  display: block;
  font-size: ${$size.type.fontSize.title.md};
  font-weight: ${$primitives.typography.fontWeight.sans.bold};
  line-height: ${$size.type.lineHeight.title.sm};
  margin: 0;
  padding: 0;
`

const ContentBody = styled('div')`
  display: flex;
  flex-direction: column;
  gap: ${$space.gap.xxl};
  width: 100%;
`

const ContentAction = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

interface PropsAddModalContent {
  children: React.ReactNode
}

function AddModalContent({ children }: PropsAddModalContent) {
  return <ModalContent>{children}</ModalContent>
}

AddModalContent.Banner = Banner
AddModalContent.Content = Content
AddModalContent.Title = ContentTitle
AddModalContent.Body = ContentBody
AddModalContent.Action = ContentAction

export default AddModalContent
