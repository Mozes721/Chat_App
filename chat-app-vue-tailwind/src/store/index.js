import Vue from "vue";
import Vuex from "vuex";


export default new Vuex.Store({
	state: {
	users: [],
},
getters: {
	getUsers: state => state.users
},
mutations: {
	ADD_USER (state, user) {
		state.users.push(user);	
	},
	REMOVE_USER (state, user) {
		state.users.pop(user);	
	},
	GET_USERS(state, user) {
		state.users = [...state.sers, {user}]
	}
},
actions: {
	addUser({commit}, payload) {
		commit('ADD_USER', payload)
	},
	removeUser({commit}, payload) {
		commit('REMOVE_USER', payload)
	},
	async getUsers({commit}, payload) {
		try {
			commit('GET_USERS', payload)
		} catch (error) {
			console.log(error)
		}
	}
    }
})