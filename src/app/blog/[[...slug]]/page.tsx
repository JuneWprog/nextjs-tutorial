import React from 'react'
import {Metadata} from 'next'

export const metadata:Metadata ={
  title:{
    absolute:"blog"
  }
}


const OptionalCatchAll = ({params}:{params: Promise <{slug: string[]}>}) => {
     
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

