'use client'
import {useEffect} from 'react'

const ErrorPage = ({error}:{error:Error}) => {
    useEffect(() => {
        console.error('Error:', error.message)
    }, [error])
    

  return (
    <div>
        <h1 className="text-red-500 text-center">Error fetching users data</h1>
        <p className="text-red-500 text-center">{error.message}</p>  
    </div>
  )
}

export default ErrorPage