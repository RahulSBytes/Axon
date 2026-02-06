import { lazy, Suspense } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import ResponsiveLayout from '../components/Layouts/Responsive';
import ProtectedRoute from './ProtectedRoute';
import MiniLoader from '../components/minicomponents/MiniLoader';

const PageLoader = () => <MiniLoader />

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