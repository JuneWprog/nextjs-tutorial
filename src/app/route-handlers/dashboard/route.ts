export  async function GET (){
    return new Response(JSON.stringify({message: 'Hello from dashboard route!'}), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })
}