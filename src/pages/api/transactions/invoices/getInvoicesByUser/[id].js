import { data } from './__mock'

const handler = async (req, res) => {
  if (req.method !== 'GET') res.status(405)

  try {
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }

  // Join the line items
}

export default handler
