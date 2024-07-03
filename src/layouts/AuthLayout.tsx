import { styled } from 'goober'
import { Outlet } from 'react-router-dom'
import AppHeader from '../components/Common/AppHeader'

const Layout = styled('div')`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
  width: 100%;
`

function AuthLayout() {
  return (
    <Layout id="pageLayout" className="signed-layout">
      <AppHeader />

      <Outlet />
    </Layout>
  )
}

export default AuthLayout
