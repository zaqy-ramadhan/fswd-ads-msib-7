import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/", // Base URL for API requests
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Login API
export const login = (credentials) => {
  return api.post("login", credentials);
};

const getAuthToken = () => localStorage.getItem("token");

const BASE_URL = "http://localhost:8000/api/";

const token = getAuthToken();

export const fetchEmployees = async (page = 1, perPage = 10, name = "", all) => {
  try {
    const response = await axios.get(`${BASE_URL}employees`, {
      params: {
        page,
        per_page: perPage,
        name,
        all:all,
      },
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching employees");
  }
};

export const getEmployeeById = async (id) => {

  try {
    const response = await axios.get(`${BASE_URL}employees/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching employee by ID:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const createEmployee = (data) => {
  return api.post("employees", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateEmployee = async (id, formData) => {
  const response = await api.post(`update-employees/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data", 
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteEmployee = async (id) => {
  const response = await api.delete(`employees/${id}`, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  return Promise.resolve();
};

export const fetchCutis = async (page = 1, perPage = 10, name = "", all = false) => {
  try {
    const response = await axios.get(`${BASE_URL}cuti`, {
      params: {
        page,
        per_page: perPage,
        name,
        all: all ? 'true' : 'false', 
      },
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching cutis");
  }
};

export const deleteCuti = async (id) => {
  const response = await api.delete(`cuti/${id}`, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createCuti = async (formData) => {
  try {
      const response = await axios.post(`${BASE_URL}cuti`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
              'Accept': 'application/json',
              Authorization: `Bearer ${token}`,
          },
      });
      return response.data;
  } catch (error) {
      throw new Error(error.response?.data?.message || 'Error creating leave');
  }
};

export const getCutiById = async (id) => {

  try {
    const response = await axios.get(`${BASE_URL}cuti/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching employee by ID:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const updateCuti = async (id, formData) => {
  const response = await api.post(`update-cuti/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data", 
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
