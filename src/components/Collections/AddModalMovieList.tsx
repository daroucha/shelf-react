import { styled } from 'goober'
import {
  $color,
  $primitives,
  $size,
  $space,
  SansSerif,
} from 'remaster-ui'

const ListContainer = styled('ul')`
  border-color: ${$color.border.default.secondary.light};
  border-radius: ${$size.radius.md};
  border-style: solid;
  border-width: ${$size.border.sm};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: ${$space.gap.xl};
  max-height: 30vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding-block: ${$space.block.lg};
  padding-inline: ${$space.inline.lg};
`

const ListText = styled(SansSerif)`
  align-items: center;
  color: ${$color.text.plain.tertiary.light};
  display: flex;
  flex-direction: row;
  font-size: ${$size.type.fontSize.text.sm};
  font-weight: ${$primitives.typography.fontWeight.sans.regular};
  justify-content: center;
  line-height: ${$size.type.lineHeight.text.sm};
  margin: 0;
  padding: 0;
  text-align: center;
  width: 100%;
`

interface PropsAddModalMovieList {
  children: React.ReactNode
}

function AddModalMovieList({ children }: PropsAddModalMovieList) {
  return <ListContainer>{children}</ListContainer>
}

AddModalMovieList.Text = ListText

export default AddModalMovieList
