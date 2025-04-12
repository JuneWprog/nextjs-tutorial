import React from 'react'
type Author = {
    id: number,
    name: string
}


const AuthorDetail = async ({userId}:{userId:number}) => {
    const res = await  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    const author: Author = await res.json()
  return (
    <div>
        <h4 className='text-lg font-bold'>Author:  <span>{author.name}</span> </h4>
       
      
    </div>
  )
}

export default AuthorDetail
