export const host = "http://localhost:3000";
// export const host = "https://ourchat-821q.onrender.com";
export const loginRoute = `${host}/api/auth/login`;
export const userListRoute = `${host}/api/auth/user-list`;
export const userDetailsRoute = `${host}/api/auth/user-details`;
export const registerRoute = `${host}/api/auth/register`;
export const logoutRoute = `${host}/api/auth/logout`;
export const allUsersRoute = `${host}/api/auth/allusers`;
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const recieveMessageRoute = `${host}/api/messages/getmsg`;
export const setAvatarRoute = `${host}/api/auth/setavatar`;

export const createGameRoute = `${host}/api/message/message`;
export const openGameRoute = `${host}/api/message/message`;
export const deleteGameRoute = `${host}/api/message/message`;