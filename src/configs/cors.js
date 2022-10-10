let origin = [process.env.BASE_URL]

if (process.env.NODE_ENV === 'production') {
  origin = false
}

export default {
  methods: 'GET, POST',
  credentials: true,
  origin,
}