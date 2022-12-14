import React from 'react'
import { useNavigate, Form, redirect } from 'react-router-dom';
import { deleteClient } from '../api/clients';

export async function action({params}){
    deleteClient(params.client)
    console.log('entra');
    return redirect('/');
}

const Client = ({client}) => {
    const navigate = useNavigate();
    const {nombre, id, empresa, email, telefono, notas}= client;
  return (
    <tr className='border-b'>
        <td className="p-6 space-y-2">
            <p className='text-2xl text-gray-800'> {nombre}</p>
            <p>{empresa}</p>

        </td>
        <td className="p-6">
            <p className='text-gray-600'> <span className='text-gray-800 uppercase font-bold'> Email: </span> {email}</p>
            <p className='text-gray-600'> <span className='text-gray-800 uppercase font-bold'> Number: </span> {telefono}</p>
            <p className='text-gray-600'> <span className='text-gray-800 uppercase font-bold'> Notes: </span> {notas}</p>
        </td>
        <td className="p-6 flex flex-col place-items-center gap-3">
            <Form method="post" action={`/customers/${id}/delete`} onSubmit={(e)=>{
                if(!confirm('Do you want to delete this register?')){
                    e.preventDefault()
                }
            }}>
                <button type='submit' className='text-red-600 hover:text-red-700 uppercase font-bold text-xs' >
                delete  
                </button>
            </Form>

            <button type='button' className='text-blue-600 hover:text-blue-700 uppercase font-bold text-xs' onClick={() => navigate(`/customers/${id}/edit`)}>
                edit
            </button>
        </td>
    </tr>
  )
}

export default Client