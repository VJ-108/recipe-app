import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/constant";
import { toast } from "react-toastify";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ username, email, password }) => {
    axios.defaults.withCredentials = true;
    const promise = axios.post(`${baseUrl}/user/signup`, {
      username,
      email,
      password,
    });
    toast.promise(promise, {
      pending: "Registering user...",
      success: "User registered successfully!",
      error: {
        render({ data }) {
          return data?.response?.data?.message || "Failed to register user";
        },
      },
    });
    const response = await promise;
    return response.data?.user;
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }) => {
    axios.defaults.withCredentials = true;
    let promise;
    if (!email && !password) {
      promise = axios.post(`${baseUrl}/user/login`, {});
    } else {
      promise = axios.post(`${baseUrl}/user/login`, {
        email,
        password,
      });
    }
    toast.promise(promise, {
      pending: "Logging in...",
      success: "Logged in successfully!",
      error: {
        render({ data }) {
          return data?.response?.data?.message || "Failed to log in";
        },
      },
    });
    const response = await promise;
    return response.data?.user;
  }
);

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  axios.defaults.withCredentials = true;
  const promise = axios.post(`${baseUrl}/user/logout`);
  toast.promise(promise, {
    pending: "Logging out...",
    success: "Logged out successfully!",
    error: {
      render({ data }) {
        return data?.response?.data?.message || "Failed to log out";
      },
    },
  });
  await promise;
  return {};
});

export const deleteUserAccount = createAsyncThunk(
  "user/deleteAccount",
  async () => {
    axios.defaults.withCredentials = true;
    const promise = axios.delete(`${baseUrl}/user/deleteAccount`);
    toast.promise(promise, {
      pending: "Deleting account...",
      success: "Account deleted successfully!",
      error: {
        render({ data }) {
          return data?.response?.data?.message || "Failed to delete account";
        },
      },
    });
    await promise;
    return {};
  }
);

export const verifyOTP = createAsyncThunk(
  "user/verifyOTP",
  async ({ email, otp }) => {
    axios.defaults.withCredentials = true;
    const promise = axios.post(`${baseUrl}/user/verifyOTP`, { email, otp });
    toast.promise(promise, {
      pending: "Verifying OTP...",
      success: "OTP verified successfully!",
      error: {
        render({ data }) {
          return data?.response?.data?.message || "Failed to verify OTP";
        },
      },
    });
    const response = await promise;
    return response.data?.user;
  }
);

export const resendOTP = createAsyncThunk(
  "user/resendOTP",
  async ({ email }) => {
    axios.defaults.withCredentials = true;
    const promise = axios.post(`${baseUrl}/user/resendOTP`, { email });
    toast.promise(promise, {
      pending: "Resending OTP...",
      success: "OTP resent successfully!",
      error: {
        render({ data }) {
          return data?.response?.data?.message || "Failed to resend OTP";
        },
      },
    });
    await promise;
    return {};
  }
);

export const isSecretCorrect = createAsyncThunk(
  "user/isSecretCorrect",
  async ({ secret }) => {
    axios.defaults.withCredentials = true;
    const promise = axios.post(`${baseUrl}/user/isSecretCorrect`, { secret });
    toast.promise(promise, {
      pending: "Checking secret...",
      success: "Secret is correct!",
      error: {
        render({ data }) {
          return data?.response?.data?.message || "Failed to check secret";
        },
      },
    });
    const response = await promise;
    return response.data?.correct;
  }
);
