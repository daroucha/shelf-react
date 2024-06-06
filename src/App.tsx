import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { setup } from 'goober'
import React from 'react'

import AuthLayout from './layouts/AuthLayout'
import UnAuthLayout from './layouts/UnAuthLayout'
import RouteGuard from './components/Common/RouteGuard'
import AppToasts from './components/Common/AppToasts'

import Explore from './pages/Explore'
import Login from './pages/Login'

setup(React.createElement)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <AppToasts />

      <BrowserRouter>
        <Routes>
          <Route
            index
            element={<Navigate replace to="explore" />}
          />

          {/* UnAuthenticated Layout Routes */}
          <Route element={<UnAuthLayout />}>
            <Route path="login" element={<Login />} />
          </Route>

          {/* Authenticated Layout Routes */}
          <Route element={<AuthLayout />}>
            <Route path="explore" element={<Explore />} />
          </Route>

          {/* Authenticated and Guarded Layout Routes */}
          <Route
            element={
              <RouteGuard>
                <AuthLayout />
              </RouteGuard>
            }
          >
            <Route path="profile" />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
