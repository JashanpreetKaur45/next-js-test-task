import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registerUser, verifyOtp } from "../thunk/createOnBoardingThunk";


// Define the initial state structure
interface Education {
  school: string;
  hasGraduated: boolean;
  graduationYear?: number;
}

interface Preferences {
  categories: string[];
  tags: string[];
}

interface OnboardingState {
  name: string;
  email: string;
  clientType: string;
  education: Education;
  organization: string[];
  preferences: Preferences;
  referralSource: string[];
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

// Initial state
const initialState: OnboardingState = {
  name: "",
  email: "",
  clientType: "",
  education: { school: "", hasGraduated: false },
  organization: [],
  preferences: { categories: [], tags: [] },
  referralSource: [],
  loading: false,
  error: null,
  successMessage: null,
};

// 📌 Onboarding Slice
export const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<{ field: keyof OnboardingState; value: any }>) => {
        console.log(state, action)
      state[action.payload.field] = action.payload.value;
    },
    resetOnboarding: () => initialState,
  },
  extraReducers: (builder) => {
    // Handle registerUser thunk
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = action.payload.message;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Handle verifyOtp thunk
    builder.addCase(verifyOtp.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    });
    builder.addCase(verifyOtp.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = action.payload.message;
    });
    builder.addCase(verifyOtp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { updateField, resetOnboarding } = onboardingSlice.actions;
export default onboardingSlice.reducer;
