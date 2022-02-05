const users = [];
const removed_user = [];
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
	// console.log(users)
	return {user};

}

const removeUser = (id) => {
	const index = users.find((user) => {
		user.id === id
		removed_user[0] = user.name;
		
	});
	if(index !== -1) {
		return users.splice(index,1)[0];
	}
}

const getUser = (id) => users
		.find((user) => user.id === id);

const allUsers = users.forEach((function (item, index){
	console.log(item.name, index)
}) )


module.exports = {addUser, removeUser,
		getUser, allUsers, users};