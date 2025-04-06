import Counter from './Counter'
import React from 'react'
export const metadata ={
    title:"Counter"
}

const Counterpage = async () => {
   //simulate a network request
   await new Promise((resolve) => setTimeout(resolve, 1000))
  return (
    <div>
      <Counter/>
    </div>
  )
}

export default Counterpage
