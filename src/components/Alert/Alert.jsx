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

  return null
}

export default Alert
