import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
// import HomePage from '../pages/Home/HomePage';
import TodoPage from '../pages/TodoPage';
import SigninPage from '../pages/SigninPage';
import SignupPage from '../pages/SignupPage';
import { isSignedin } from '../utils/checker';

const router = createBrowserRouter([
  {
    path: '/',
    element: <TodoPage />,
  },
  {
    path: '/signin',
    element: <SigninPage />,
    loader: async () => {
      if (isSignedin()) window.location.href='/';
      return null;
    }
  },
  {
    path: '/signup',
    element: <SignupPage />,
    loader: async () => {
      if (isSignedin()) window.location.href='/';
      return null;
    }
  }
]);

export default router;
