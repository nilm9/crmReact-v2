import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from './components/Layout'
import NewCustomer from './pages/NewCustomer'
import Index, {loader as customersLoader} from './pages/Index'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        //Inherits and adds w index
        index: true,
        element: <Index />,
        loader: customersLoader
      },
      {
        path: '/customers/new',
        element: <NewCustomer/>
      },
    ]
  },


]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
