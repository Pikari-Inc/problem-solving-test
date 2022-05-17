import { useState } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

const Alert = () => {
  const {
    query: { success },
  } = useRouter()

  const [active, setActive] = useState(true)

  if (!active) return null

  if (success) {
    Swal.fire({
      title: 'Yay!',
      text: 'Payment received 😃',
      icon: 'success',
      confirmButtonText: 'Cool',
      confirmButtonColor: '#450974',
    })
  }

  // if (success) {
  //   return (
  //     <div
  //       className="w-full h-full absolute inset-0 flex justify-center z-10 items-center bg-[rgba(250,250,250,0.95)]"
  //       onClick={() => setActive(false)}
  //     >
  //       <div className="bg-white rounded shadow-xl p-8 block border border-slate-100 relative">
  //         <span className="text-green-600 text-2xl text-center mx-auto block">✓</span>
  //         <h2 className="text-purple-900 font-bold text-lg">Payment Successful</h2>
  //       </div>
  //     </div>
  //   )
  // }

  return null
}

export default Alert
