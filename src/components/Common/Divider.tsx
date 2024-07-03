import { styled } from 'goober'
import { $color, $space } from 'remaster-ui'

const HorizontalDivider = styled('div')`
  box-sizing: border-box;
  display: block;
  padding-block: ${$space.block.xxs};
  padding-inline: ${$space.inline.sm};
  width: 100%;

  hr {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background: ${$color.border.default.secondary.light};
    border: 0;
    height: 1px;
    width: 100%;
  }
`

function Divider() {
  return (
    <HorizontalDivider>
      <hr />
    </HorizontalDivider>
  )
}

export default Divider
