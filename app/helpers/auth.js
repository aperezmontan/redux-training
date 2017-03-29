export default function auth () {
  return new Promise ((resolve, reject) => {
    setTimeout(() => resolve ({
        name: 'Ari Perez',
        uid: 'ariperez'
    }), 2000)
  })
}
