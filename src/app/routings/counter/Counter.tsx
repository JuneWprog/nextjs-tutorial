'use client'
import React from 'react'
import {useState} from 'react'

const Counter = () => {
    const [count, setCount] = useState(1)
    if(count === 5){
      throw new Error('Error in counter')
    }

    const handleClick = async () => {
     
        setCount(count + 1)
      
      }
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>increase</button>
    </div>
  )
}

export default Counter
