import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

// 📌 Thunk to register the user
export const registerUser = createAsyncThunk(
  "onboarding/registerUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const userData = state.onboarding; // Get data from Redux store
      console.log(userData,"thunk---------------")
      const res = await fetch("https://next-js-backend-wbui.vercel.app/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Registration failed");
      }

      return await res.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// 📌 Thunk to verify OTP
export const verifyOtp = createAsyncThunk(
  "onboarding/verifyOtp",
  async ({ email, otp }: { email: string; otp: string }, { rejectWithValue }) => {

    try {
      const res = await fetch("https://next-js-backend-wbui.vercel.app/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "OTP verification failed");
      }
      return await res.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
