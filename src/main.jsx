import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from './components/Layout'
import NewCustomer, {action as newClientAction} from './pages/NewCustomer'
import Index, {loader as customersLoader} from './pages/Index'
import ErrorPage from './components/ErrorPage'
import EditClient from './pages/EditClient'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        //Inherits and adds w index
        index: true,
        element: <Index />,
        loader: customersLoader,
        errorElement: <ErrorPage/>
      },
      {
        path: '/customers/new',
        element: <NewCustomer/>,
        action: newClientAction
      },
      {
        path: '/customers/:customerId/edit',
        element: <EditClient />,

      }
    ]
  },


]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
