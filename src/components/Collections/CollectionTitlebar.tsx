import { styled } from 'goober'
import {
  SansSerif,
  $color,
  $size,
  $primitives,
  $space,
} from 'remaster-ui'

const Titlebar = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const Title = styled(SansSerif)`
  color: ${$color.text.title.primary.light};
  display: block;
  font-size: ${$size.type.fontSize.title.lg};
  font-weight: ${$primitives.typography.fontWeight.sans.bold};
  line-height: ${$size.type.lineHeight.title.sm};
  margin: 0;
  padding: 0;
`

const Tools = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: ${$space.gap.lg};
  justify-content: flex-end;
`

interface PropsCollectionTitlebar {
  children: React.ReactNode
}

function CollectionTitlebar({ children }: PropsCollectionTitlebar) {
  return <Titlebar>{children}</Titlebar>
}

CollectionTitlebar.Title = Title
CollectionTitlebar.Tools = Tools

export default CollectionTitlebar
