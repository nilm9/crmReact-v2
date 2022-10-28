import React from 'react'
import {useNavigate, Form, useActionData} from 'react-router-dom'
import FormClient from '../components/FormClient'
import Error from '../components/Error';

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
}



function NewCustomer() {
    const navigate = useNavigate()
    const errors = useActionData()
  return (
    <>

        <div className="flex flex-wrap justify-between ">
            <div className="flex flex-col">
                <h1 className='font-black text-4xl text-blue-900'>New Client</h1>
                <p className="mt-3"> fill all the fields to add a new customer</p> 
            </div>
            <div className="flex justify-end">
                <button className='bg-blue-800 text-white px-7 py-2 font-bold uppercase my-3' onClick={()=>navigate(-1)}>
                    Return
                </button>
            </div>
        </div>




        <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
            {errors?.length && errors.map((error, i) => <Error key={i}>{error}</Error>)}
            <Form method='post'>
                <FormClient/>
                <input type="submit" className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg' value="Register Client"/>
            </Form>

        </div>
    
    
    </>
  )
}

export default NewCustomer