import { createStore } from 'vuex'
import http from '@/http-common';

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
