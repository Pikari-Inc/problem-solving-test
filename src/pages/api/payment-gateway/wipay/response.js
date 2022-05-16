const handler = async (req, res) => {
  console.log('WIPAY RESPONSE')
  console.log(req.query)

  if (!Object.entries(req.query).length || req.query.status === 'failed') {
    // This should redirect back to the app homepage with failure details
    res.status(500).json({ message: 'WiPay did not pass transaction details' })
  }

  try {
    res.redirect(307, '/?success=true')
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default handler
