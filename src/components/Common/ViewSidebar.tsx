import { styled } from 'goober'
import { $space } from 'remaster-ui'

const ViewSidebar = styled('div')`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 0;
  gap: ${$space.gap.xxl};
  width: 100%;
`

export const ViewSidebarContent = styled('div')`
  display: flex;
  flex-direction: column;
  gap: ${$space.gap['4xl']};
`

export const ViewSidebarTitle = styled('div')`
  box-sizing: border-box;
  display: inherit;
  flex-direction: inherit;
  padding-inline: ${$space.inline.sm};
  gap: inherit;
`

export const ViewSidebarNavigation = styled('div')`
  display: grid;
  gap: ${$space.gap.xs};
  grid-auto-flow: row;
  justify-items: stretch;
  width: 100%;

  > .stretch {
    width: -webkit-fill-available;
  }
`

export default ViewSidebar
