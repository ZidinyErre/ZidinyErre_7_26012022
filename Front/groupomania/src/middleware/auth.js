import http from '../http-common'

export default (to,from, next) =>{
    let auth =  http.post('/auth/token' , {
                token: localStorage.getItem('token')
                })

   if(!auth){

    next({name: 'login'})

    return false;
   }
}

// export default  async function auth({ next, router}) {
//     await http.post('/auth/token' , {
//         token: localStorage.getItem('token')
//     })
//     .then(() => next())
//     .catch(() => router.push({name: 'login'}));
// }