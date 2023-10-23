import Vuex from "vuex";

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
	REMOVE_USER(state, user) {
		const index = state.users.indexOf(user);
		if (index !== -1) {
		  state.users.splice(index, 1);
		}
	  },
	  UPDATE_USER_LIST(state, userList) {
		state.users = userList;
	  },
	},
actions: {
	addUser({commit}, payload) {
		commit('ADD_USER', payload)
	},
	removeUser({commit}, payload) {
		commit('REMOVE_USER', payload)
	},
	updateUserList({ commit }, userList) {
		commit('UPDATE_USER_LIST', userList);
	  },
    }
})
