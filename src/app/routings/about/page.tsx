import React from 'react'

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "The About Page"
  };

const About = () => {
  return (
    <div>
        <h1 className='text-4xl font-bold'>About</h1>
       
    </div>
  )
}

export default About
