import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import ResponsiveLayout from '../components/Layouts/Responsive';

import ProtectedRoute from './ProtectedRoute';

import Home from '../components/Pages/Home'
import Login from '../components/Pages/Login'
import Signup from '../components/Pages/Signup'
import Saved from '../components/Pages/Saved'
import History from '../components/Pages/History'
import NotFound from '../components/Pages/NotFound'
import Tagline from '../components/minicomponents/Tagline';
import Chat from '../components/Pages/Chat';
import About from '../components/Pages/About';
import Privacy from '../components/Pages/Privacy';
import Terms from '../components/Pages/Terms';


export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<ProtectedRoute><ResponsiveLayout /></ProtectedRoute>}>
        <Route path='/' element={<Home />} >
          <Route index element={<Tagline />} />
          <Route path='/chat/:chatid' element={<Chat />} />
        </Route>
        <Route path='/saved' element={<Saved />} />
        <Route path='/history' element={<History />} />
        <Route path='/about' element={<About />} />
      </Route>

      <Route path='/login' element={<Login />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path='/signup' element={<Signup />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </>
  )
);