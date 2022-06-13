import { createStore } from 'vuex'
const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/auth/'
})

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    createAccount: ({commit}, userInfos) => {
      commit;
      console.log(userInfos);
      instance.post('/signup', userInfos)
      .then(function (response) {
        console.log(response);
      })
      .catch( function (error){
        console.log(error);
      });
    }
  },
  modules: {
  }
})
