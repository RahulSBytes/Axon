import { lazy, Suspense } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import ResponsiveLayout from '../components/Layouts/Responsive';
import ProtectedRoute from './ProtectedRoute';

const PageLoader = () => (
  <div className="flex items-center justify-center h-full">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-zinc-400">Loading...</p>
    </div>
  </div>
);

// Helper to wrap lazy components with Suspense
const LazyRoute = ({ component: Component }) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

// Lazy load components
const Home = lazy(() => import('../components/Pages/Home'));
const Login = lazy(() => import('../components/Pages/Login'));
const Signup = lazy(() => import('../components/Pages/Signup'));
const Saved = lazy(() => import('../components/Pages/Saved'));
const History = lazy(() => import('../components/Pages/History'));
const NotFound = lazy(() => import('../components/Pages/NotFound'));
const Chat = lazy(() => import('../components/Pages/Chat'));
const About = lazy(() => import('../components/Pages/About'));
const Privacy = lazy(() => import('../components/Pages/Privacy'));
const Terms = lazy(() => import('../components/Pages/Terms'));
const Tagline = lazy(() => import('../components/minicomponents/Tagline'));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<ProtectedRoute><ResponsiveLayout /></ProtectedRoute>}>
        <Route path='/' element={<LazyRoute component={Home} />}>
          <Route index element={<LazyRoute component={Tagline} />} />
          <Route path='/chat/:chatid' element={<LazyRoute component={Chat} />} />
        </Route>
        <Route path='/saved' element={<LazyRoute component={Saved} />} />
        <Route path='/history' element={<LazyRoute component={History} />} />
        <Route path='/about' element={<LazyRoute component={About} />} />
      </Route>

      <Route path='/login' element={<LazyRoute component={Login} />} />
      <Route path="/privacy" element={<LazyRoute component={Privacy} />} />
      <Route path="/terms" element={<LazyRoute component={Terms} />} />
      <Route path='/signup' element={<LazyRoute component={Signup} />} />
      <Route path="*" element={<LazyRoute component={NotFound} />} />
    </>
  )
);