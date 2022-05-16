import { useState, useEffect, useRef } from 'react'
import { CgSpinner } from 'react-icons/cg'
import { useRouter } from 'next/router'

const baseStyle =
  'flex justify-center text-white text-xs font-bold bg-green-600 py-1.5 px-4 rounded hover:bg-green-500 transition-colors'

function WiPayButton({ total, orderId, data, className, ...props }) {
  const [isLoading, setIsLoading] = useState(false)
  const [buttonW, setButtonW] = useState(null)
  const router = useRouter()
  const buttonRef = useRef(null)

  useEffect(() => {
    setButtonW(`${buttonRef.current.offsetWidth}px`)
  }, [])

  const handleClick = async () => {
    setIsLoading(true)
    const args = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        total: total,
        orderId,
        data,
      }),
    }

    try {
      const res = await fetch(`/api/payment-gateway/wipay/request`, args)
      const { url } = await res.json()
      router.push(url)
    } catch (error) {
      console.error(error.message)
      setIsLoading(false)
    }
  }

  return (
    <button ref={buttonRef} className={`${baseStyle} ${className}`} style={{ width: buttonW }} onClick={handleClick}>
      {(isLoading && <CgSpinner className="text-lg animate-spin" />) || <span>Pay Now</span>}
    </button>
  )
}

export default WiPayButton
