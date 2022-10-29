import { getClient } from "../api/clients";
import React from 'react'
import {useNavigate, Form, useLoaderData, useActionData, redirect} from 'react-router-dom'
import FormClient from '../components/FormClient'
import Error from '../components/Error';
import { updateClient } from "../api/clients";

export async function loader({params}){
  const client = await getClient(params.customerId);
  if(Object.values(client).length===0){
    throw new Response('', {
      status:404,
      statusText: 'No results were found',
    })
  }
  console.log(client);
}

export async function getClientsEdit(){
    const req = await fetch(import.meta.env.VITE_API_URL)
    const response = req.json();

    return response;
}


export async function action({request}){
  const formData = await request.formData();
  //debug formdata
  //console.log([...formData]);
  const data = Object.fromEntries(formData);
  const email = formData.get('email');

  //Validate
  const errors =[]
  if(Object.values(data).includes('')){
      errors.push('All the fields are required')
  }

  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  if(!regex.test(email)){
      errors.push("invalid email")
  }
  


  if(Object.keys(errors).length){
      return errors
  }

  //Refresh the client
  await updateClient(params.customerId ,data)
  return redirect('/') // use redirect when we use action & loader
}




function EditClient() {

  const navigate = useNavigate();
  const client = useLoaderData();
  const errors = useActionData();
  console.log(client);

  return (
      <>

        <div className="flex flex-wrap justify-between ">
            <div className="flex flex-col">
                <h1 className='font-black text-4xl text-blue-900'>Edit Client</h1>
                <p className="mt-3"> fill all the fields to edit an old customer</p> 
            </div>
            <div className="flex justify-end">
                <button className='bg-blue-800 text-white px-7 py-2 font-bold uppercase my-3' onClick={()=>navigate(-1)}> 
                    {/* Navigate is good whrn using a button */}
                    Return
                </button>
            </div>
        </div>

        <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
            {errors?.length && errors.map((error, i) => <Error key={i}>{error}</Error>)}
            <Form method='post'>
                <FormClient client={client}/>
                <input type="submit" className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg' value="Register Client"/>
            </Form>

        </div>
    
    
    </>






  )
}

export default EditClient