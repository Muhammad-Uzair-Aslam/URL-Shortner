import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SignupPayload ,ForgotPasswordPayload,ResetPasswordPayload,ChangePasswordPayload,AuthState} from "@/types/types";

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ name, email, password }: SignupPayload, { rejectWithValue }) => {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      return rejectWithValue(data.error || "Signup failed");
    }
    return data.user;
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }: ForgotPasswordPayload, { rejectWithValue }) => {
    const response = await fetch("/api/password/forget", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (!response.ok) {
      return rejectWithValue(data.error || "Failed to send reset link");
    }
    return data.message;
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, newPassword }: ResetPasswordPayload, { rejectWithValue }) => {
    const response = await fetch("/api/password/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });
    const data = await response.json();
    if (!response.ok) {
      return rejectWithValue(data.error || "Failed to reset password");
    }
    return data.message;
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (
    { email, oldPassword, newPassword }: ChangePasswordPayload,
    { rejectWithValue }
  ) => {
    const response = await fetch("/api/password/change", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, oldPassword, newPassword }),
    });
    const data = await response.json();
    if (!response.ok) {
      return rejectWithValue(data.error || "Failed to change password");
    }
    return data.message;
  }
);

const initialState: AuthState = {
  loading: false,
  user: null,
  error: null,
  resetMessage: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.loading = false;
      state.user = null;
      state.error = null;
      state.resetMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.resetMessage = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.resetMessage = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.resetMessage = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.resetMessage = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.resetMessage = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.resetMessage = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
