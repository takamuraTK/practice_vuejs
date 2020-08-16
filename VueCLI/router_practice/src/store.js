import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        count: 2
    },
    getters: {
        doubleCounter: state => state.count * 2
    },
    mutations: {
        increment(state, number) {
            state.count += number
        }
    },
    actions: {
        increment(context) {
            context.commit('increment');
        }
    }
})
