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
import Favorite from '../components/Pages/Favorite'
import History from '../components/Pages/History'
import NotFound from '../components/Pages/NotFound'


export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<ProtectedRoute><ResponsiveLayout /></ProtectedRoute>}>
        <Route index element={<Home />} />
        <Route path='/saved' element={<Favorite />} />
        <Route path='/history' element={<History />} />
      </Route>

      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </>
  )
);