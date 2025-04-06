'use client'

import { useEffect } from 'react'

type ErrorProps = {
  error: Error
  reset: () => void
}
//reset is a function that can be called to reset the error boundary state and try rendering the children again
//error is the error that was thrown in the child component
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Route Error:', error)
  }, [error])

  return (
    <div className="text-center p-8">
      <h2 className="text-2xl font-bold text-red-600">Something went wrong!</h2>
      <p className="mt-2">{error.message}</p>
      <button
        onClick={reset}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  )
}
