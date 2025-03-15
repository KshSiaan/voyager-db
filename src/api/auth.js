import axios from "axios";

import { URL } from "./base";

export async function login(formData) {
  const call = await axios.post(`${URL}/login`, formData);
  return call;
}

export async function tokenIsValid(token) {
  const call = await axios.get(`${URL}/validate-token`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (call.data.token_status) {
    return true;
  } else {
    return false;
  }

  // return call;
}

export async function forgotPassword(formData) {
  const call = await axios.post(`${URL}/forgot-password`, formData);
  return call;
}

export async function verifyOtp(formData) {
  const call = await axios.post(`${URL}/verify-otp`, formData);
  return call;
}

export async function resendOtp(formData) {
  const call = await axios.post(`${URL}/resend-otp`, formData);
  return call;
}

export async function newPass(token, formData) {
  const call = await axios.post(`${URL}/create-password`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return call;
}
