
'use client'
import {useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal} from 'react';

type User={
    id:number,
    name:string,
    email:string,
    username:string
}

//fetch data in server component
const UserClient = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        const fetchUsers = async () => {

            try{
                setLoading(true);
                const res = await fetch('https://jsonplaceholder.typicode.com/users')
                if (!res.ok) {
                    throw new Error('Failed to fetch users')
                }
                setLoading(false);
                const data = await res.json()
                if(data.length===0){
                    throw new Error('No users found')
                }else{
                    setUsers(data)
                }

            }catch(error){
                setLoading(false);
                if (error instanceof Error) {
                    setError(error.message)
                } else {
                    setError('An unknown error occurred')
                }
            }
         
        };
        fetchUsers();
    }, [])
        

  return (
    <div className="grid-cols-2 gap-4 grid md:grid-cols-3 lg:grid-cols-4 p-4">
      
      {users && users.length >0 && users.map((user: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; email: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; username: any; }) => (
        <div key={user.id} className="bg-white shadow-md rounded-lg p-4 m-2">
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{`username: ${user.username}`}</p>
        </div>
      ))}
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

      
    </div>
  )
}

export default UserClient
