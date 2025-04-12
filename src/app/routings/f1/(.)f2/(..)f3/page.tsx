import Link from "next/link"

const F3 = () => {
  return (
    <div>
        <h1>Intercepted f3</h1>
        <Link href='/f4'> F4</Link>
    </div>
  )
}

export default F3
