const url = import.meta.env.VITE_API_URL

export async function getClients(){

    const resp = await fetch(url)
    const result = await resp.json()

    return result;
}


export async function getClient(id){

    const resp = await fetch(`${import.meta.env.VITE_API_URL}/${id}`)
    const result = await resp.json()

    return result;
}

export async function addClient(data){
    try {
        const resp = await fetch(url ,{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }

        })
        const result = await resp.json(); //returns weather is true or fase
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function updateClient(id, data){
    try {
        const resp = await fetch((`${import.meta.env.VITE_API_URL}/${id}`) ,{
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }

        })
        const result = await resp.json(); //returns weather is true or fase
        return result;
    } catch (error) {
        console.log(error);
    }



}

export async function deleteClient( id ){
console.log(`deleting...`);
console.log(id);

}