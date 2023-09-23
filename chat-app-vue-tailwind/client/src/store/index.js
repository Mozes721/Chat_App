import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

export default new Vuex.Store({
	state: {
	users: [],
},


getters: {
	allUsers: state => state.users
},
mutations: {
	ADD_USER (state, user) {
		state.users.push(user)
	},
	REMOVE_USER (state, user) {
		state.users.splice(user, 1);
	},

},
actions: {
	addUser({commit}, payload) {
		commit('ADD_USER', payload)
	},
	removeUser({commit}, payload) {
		commit('REMOVE_USER', payload)
	},
    }
})
