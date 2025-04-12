'use client'
import React from 'react'
import {useRouter} from 'next/navigation'
const OrderProduct = () => {
    const router = useRouter();
    const handleClick =() =>{
        router.replace('/')        //replace route in history stack
        // router.push('/')            //add route to history stack
        // router.back()                //route previous page
        // router.refresh()             //refresh same page
    }
    
  return (
    
    <div>
        <h1>Order Product</h1>
        
        <button onClick ={handleClick} className="border-2 cursor-pointer"> Place order</button>
      
    </div>
  )
}

export default OrderProduct
