
export async function generateStaticParams() {
    return [{bookId: '1'}, {bookId: '2'}, {bookId: '3'}]
}

export default async function BookPage({params,}:{params: Promise<{bookId: string}>;})  {
  
  const bookId = await params
  
    return (

    <div>
        <h1 className='text-4xl font-bold'>Book Page</h1>
        <p className='text-2xl'>Book ID: {bookId.bookId}</p>
        
      
    </div>
  )
}


