// src/routes/index.jsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from 'react-router-dom';

// Layouts
import ResponsiveLayout from '../components/Layouts/Responsive';
// import AuthLayout from '../components/Layouts/AuthLayout';

// Guards
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

// Pages
import Home from '../components/Pages/Home'
import Login from '../components/Pages/Login'
import Signup from '../components/Pages/Signup'
import Saved from '../components/Pages/Saved'
import History from '../components/Pages/History'
import NotFound from '../components/Pages/NotFound'
import Tagline from '../components/minicomponents/Tagline';
import Chat from '../components/Pages/Chat';


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
      </Route>

      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </>
  )
);