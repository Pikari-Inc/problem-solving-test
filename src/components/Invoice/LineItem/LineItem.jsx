import React from 'react'
import Link from 'next/link'

function LineItem() {
  return (
    <div>
      <Link href={`/invoice/${invoice.id}`}>
        <a className="text-cyan-700 font-bold hover:underline">Invoice</a>
      </Link>
    </div>
  )
}

export default LineItem
