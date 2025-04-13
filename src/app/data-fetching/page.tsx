import React from 'react'
import Link from 'next/link'

const Nav = () => {
  return (
    <div className="flex flex-col justify-center items-center space-x-4 p-4 bg-gray-800 text-white">
      <Link href="/data-fetching/products-db" className="hover:text-gray-300">  database  Fetching  Action  Fetching Products</Link>
        <Link href="/data-fetching/product-db-creat" className="hover:text-gray-300"> database  Fetching Action Add Product</Link>  
        <Link href="/data-fetching/react-form" className="hover:text-gray-300">  database  Fetching</Link>
        <Link href="/data-fetching/user-client" className="hover:text-gray-300"> client Fetching API</Link>
        <Link href="/data-fetching/user-server" className="hover:text-gray-300"> server Fetching API</Link>
        <Link href="/data-fetching/user-parallel" className="hover:text-gray-300"> parallel Fetching API</Link>
        <Link href="/data-fetching/posts-sequential" className="hover:text-gray-300"> sequential Fetching API</Link>

    </div>
  )
}

export default Nav
