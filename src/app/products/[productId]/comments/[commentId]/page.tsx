
"use client"
// import { useParams } from 'next/navigation'
import React from 'react'
import {notFound} from 'next/navigation'

const CommentDetail = ({params,}:{params: Promise<{productId: string, commentId: string}>}) => {
  // const { productId } = useParams()
  const {productId, commentId} = params 

  if(parseInt(commentId) > 1000 ){
    notFound()
  }
   
  

    return (
    <div>
        <h1 className='text-4xl font-bold'>Comment Detail catch all route</h1>
        <p className='text-2xl'>Product ID: {productId}</p>
        <p className='text-2xl'>Comment ID: {commentId}</p>

        <p>url /products/{productId}/comments/{commentId}</p>      
    </div>
  )
}

export default CommentDetail
