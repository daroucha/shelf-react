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

import AuthLayout from './layouts/AuthLayout'
import UnAuthLayout from './layouts/UnAuthLayout'

import Explore from './pages/Explore'
import Login from './pages/Login'

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
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={<Navigate replace to="explore" />}
          />

          {/* Authenticated Layout Routes */}
          <Route element={<AuthLayout />}>
            <Route path="explore" element={<Explore />} />
          </Route>

          {/* UnAuthenticated Layout Routes */}
          <Route element={<UnAuthLayout />}>
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
