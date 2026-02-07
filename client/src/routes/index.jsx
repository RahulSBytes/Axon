import { lazy, Suspense } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import ResponsiveLayout from '../components/Layouts/Responsive';
import ProtectedRoute from './ProtectedRoute';
import MiniLoader from '../components/minicomponents/MiniLoader';

const PageLoader = () => <MiniLoader className='h-screen' />

const LazyRoute = ({ component: Component }) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

import Home from '../components/Pages/Home'
import Login from '../components/Pages/Login'
import Tagline from '../components/minicomponents/Tagline'
import Signup from '../components/Pages/Signup'
import NotFound from '../components/Pages/NotFound'
import History from '../components/Pages/History'
import About from '../components/Pages/About'


const Saved = lazy(() => import('../components/Pages/Saved'));
const Chat = lazy(() => import('../components/Pages/Chat'));
const Privacy = lazy(() => import('../components/Pages/Privacy'));
const Terms = lazy(() => import('../components/Pages/Terms'));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<ProtectedRoute><ResponsiveLayout /></ProtectedRoute>}>
        <Route path='/' element={<Home />}>
          <Route index element={<Tagline />} />
          <Route path='/chat/:chatid' element={<LazyRoute component={Chat} />} />
        </Route>
        <Route path='/about'  element={<About />} />
        <Route path='/history' element={<History />} />
        <Route path='/saved' element={<LazyRoute component={Saved} />} />
      </Route>

      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path="/privacy" element={<LazyRoute component={Privacy} />} />
      <Route path="/terms" element={<LazyRoute component={Terms} />} />
      <Route path="*" element={<NotFound/>} />
    </>
  )
);