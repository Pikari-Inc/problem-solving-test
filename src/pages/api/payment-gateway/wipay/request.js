import fetch from 'node-fetch'
import { formatCurrency } from '@utils/currency'

const handler = async (req, res) => {
  const { data, orderId, total } = req.body

  if (!data || !orderId || !total) {
    res.status(400).json({ message: 'Missing parameters' })
  }

  // Subtract Service Fee
  const serviceFee = process.env.WIPAY_ENVIRONMENT === 'live' ? 1.03 : 1.035
  const subServiceFee = total / serviceFee - 0.25

  const payload = {
    account_number: '1234567890',
    avs: 0,
    country_code: 'TT',
    currency: 'USD',
    data: JSON.stringify(data),
    environment: 'sandbox',
    fee_structure: 'customer_pay',
    method: 'credit_card',
    order_id: orderId,
    origin: 'WePlanYouJam',
    response_url: 'http://localhost:3000/api/payment-gateway/wipay/response',
    total: formatCurrency(subServiceFee),
  }

  const wiPayPayload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  }

  try {
    const wipayResponse = await fetch('https://tt.wipayfinancial.com/plugins/payments/request', wiPayPayload)
    const { url, message } = await wipayResponse.json()

    if (!message || message !== 'OK') throw Error(`WiPay request is not OK: ${message}`)
    res.status(200).json({ url })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}

export default handler
