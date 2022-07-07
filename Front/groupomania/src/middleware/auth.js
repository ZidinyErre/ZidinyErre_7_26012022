import axios from 'axios' ;

export default  async function auth({ next, router}) {
    await axios.post('http://localhost/3000/api/auth/token' , {
        token: localStorage.getItem('token')
    })
    .then(() => next())
    .catch(() => router.push({name: 'login'}));
}