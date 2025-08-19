import axios from 'axios';

const API_URL = 'https://taskmernbackend-aboby3n7.b4a.run/api/tasks/';

// -------------------------
//🔹 Make API request when the dashboard load to fill the current user task array
// -------------------------
const getTasks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// -------------------------
// 🔹 Make API request with the taskData and token to create a task in current user
// -------------------------
const createTask = async (taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, taskData, config);
  return response.data;
};

// -------------------------
// 🔹 API request to delete a task with an ID
// -------------------------
const deleteTask = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + id, config);
  return response.data;
};

const taskService = { getTasks, createTask, deleteTask };
export default taskService;
