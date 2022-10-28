const url = import.meta.env.VITE_API_URL

export async function getClients(){

    const resp = await fetch(url)
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
        await resp.json(); //returns weather is true or fase
        console.log(resp.json());
    } catch (error) {
        console.log(error);
    }
}