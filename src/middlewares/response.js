/**
 * Create functions for sending data and error
 * 
 * @param {Request} _req 
 * @param {Response} res 
 * @param {Next} next
 * 
 * @return void
 */
const response = (_req, res, next) => {
  res.data = data => res.json({ data })

  res.error = (statusCode, errorMessage) =>
    res.status(statusCode).json({ error: errorMessage })

  next()
}

export default response