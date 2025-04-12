//list of books

import Link from "next/link"


const Books = () => {
  return (
    <div>
        <h1 className='text-4xl font-bold'>Books</h1>
        <p className='text-2xl'>List of books</p>
        <Link href ="books/1">book 1</Link>
        <Link href ="books/2">book 2</Link>
        <Link href ="books/3">book 3</Link>
      
    </div>
  )
}

export default Books
