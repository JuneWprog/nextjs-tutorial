type User={
    id:number,
    name:string,
    email:string
}

//fetch data in server component
const Users =async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await res.json()
    const users:User[]=data
    
  return (
    <div className="grid-cols-2 gap-4 grid md:grid-cols-3 lg:grid-cols-4 p-4">
      {users.map((user) => (
        <div key={user.id} className="bg-white shadow-md rounded-lg p-4 m-2">
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      ))}
      
    </div>
  )
}

export default Users
