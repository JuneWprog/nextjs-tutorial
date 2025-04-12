import React from 'react'

const Loading = () => {
  return (
    <div className="text-center p-8">
    <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
    <p className="mt-4">Loading...</p>
  </div>
  )
}

export default Loading
