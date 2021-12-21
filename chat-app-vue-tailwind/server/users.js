const users = [];

const addUser = ({id, name}) => {
	name = name.trim().toLowerCase();
	// room = room.trim().toLowerCase();

	const existingUser = users.find((user) => {
	       user.name === name
	});

	if(existingUser) {
		return{error: "Username is taken"};
	}
	const user = {id,name};

	users.push(user);
	console.log(users)
	return {user};

}

const removeUser = (id) => {
	const index = users.find((user) => {
		user.id === id
	});

	if(index !== -1) {
		return users.splice(index,1)[0];
	}
	console.log(users)
	
}

const getUser = (id) => users
		.find((user) => user.id === id);


module.exports = {addUser, removeUser,
		getUser};

