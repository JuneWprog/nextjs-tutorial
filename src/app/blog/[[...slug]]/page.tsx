import React from 'react'

const OptionalCatchAll = ({params}:{params: Promise<{slug: string[]}>}) => {
  
    const {slug} = params
  return (
    <div>
      <p> Optional Catch All Route</p>
      <p>{JSON.stringify(slug)}</p>
      <p>urls: /blog/12/35 slug=["12","35"]  or   /blog </p>
    </div>
  )
}

export default OptionalCatchAll 

