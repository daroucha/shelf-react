import { SvgSpinner } from 'remaster-ui'
import { styled } from 'goober'

const Page = styled('div')`
  align-items: center;
  display: flex;
  height: 100dvh;
  inset: 0px;
  justify-content: center;
  position: fixed;
  width: 100dvw;
  z-index: 99999999;
`

function RouteLoading() {
  return (
    <Page>
      <SvgSpinner />
    </Page>
  )
}

export default RouteLoading
