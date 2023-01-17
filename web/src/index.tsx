import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Index from './pages/Index';
import Signup from './pages/Signup';
import Login from './pages/Login';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);

const router = createBrowserRouter([
    {
        path: '/',
        element: <Index />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <Signup />,
    },
]);

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
