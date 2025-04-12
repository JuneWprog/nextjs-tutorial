// 'use client'

// import React from 'react'

// //catch all the params in the url and return an array of strings
// const SlugPage =  ({params}:{params: Promise<{slug: string[]}>}) => {
  
//     const {slug} = params
//   return (
//     <div>
//       <h1 className='text-4xl font-bold'>Docs Slug page</h1>
//       <p>slug return an array object can be access by id</p>
//       <p>{Object.keys(slug) } </p>
//     <p> { slug.length > 0 ? slug[0] : "No slug found"}</p> 
//        {/* Display raw JSON slug */}

//        <p>JSON.stringify(slug)</p>
//        <p className='mt-4'>
//         Slug Array: <code>{JSON.stringify(slug)}</code>
//       </p>

//       {/* Map over the slug array */}
//       <ul className='list-disc ml-6 mt-2'>
//         {slug && slug.length > 0 ? (
//           slug.map((part, idx) => <li key={idx}>{part}</li>)
//         ) : (
//           <li>No slug found</li>
//         )}
//       </ul>
//     </div>
//   )
// }

// export default SlugPage

export default async function SlugPageDocs({params}: { params: Promise<{ slug: string[] }> }) {
    const {slug} = await params
    
    if (slug && slug.length > 0 ){
        return  (
        slug.map((part, idx) => <li key={idx}>{part}</li>)
    )}
   
}
