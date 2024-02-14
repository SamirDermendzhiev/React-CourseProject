import axios from "axios";

const apiUrl = "http://localhost:3000/users";

export function getAllUsers() {
  console.log("here");
  return axios.get(apiUrl);
}

export async function login(loginData) {
  const allUsers = (await getAllUsers()).data;
  const loggedUser = allUsers.find(
    (u) => u.email === loginData.email && u.password === loginData.password
  );
  console.log("here");
  if (loggedUser) {
    localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
    return;
  }
  throw new Error("Wrong input.");
}

export function getLoggedUser() {
  return JSON.parse(localStorage.getItem("loggedUser"));
}

export function logout() {
  localStorage.removeItem("loggedUser");
}

export function getUserById(id) {
  return axios.get(`${apiUrl}/${id}`);
}

export function updateUser(userData) {
  return axios.put(`${apiUrl}/${userData.id}`, userData);
}
export async function register(userData) {
  const allUsers = (await getAllUsers()).data;

  if (allUsers.find((u) => u.email === userData.email)) {
    throw new Error("Email already exists!");
  }

  userData = {
    ...userData,
    isAdmin: false,
  };
  return axios.post(apiUrl, userData);
}

export function deleteUser(id) {
  return axios.delete(`${apiUrl}/${id}`);
}
