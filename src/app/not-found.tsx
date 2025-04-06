import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div>
      <p>The Page is not Found  </p>
        <p>404</p>
        <Link href="/">Go back</Link>
    </div>
  )
}

export default NotFound
