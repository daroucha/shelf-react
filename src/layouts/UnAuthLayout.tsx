import { Outlet } from 'react-router-dom'
import { styled } from 'goober'

const Layout = styled('div')`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: center;
  min-height: 100vh;
  padding-inline: 10%;
  gap: 10%;
  width: 100%;
`

function UnAuthLayout() {
  return (
    <Layout id="pageLayout" className="unauth-layout">
      <Outlet />
    </Layout>
  )
}

export default UnAuthLayout
