import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
interface SignupPayload {
  name: string;
  email: string;
  password: string;
}
interface ForgotPasswordPayload {
  email: string;
}

interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}
interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: Date | null;
    image: string | null;
    password: string;
    role: "USER" | "ADMIN" | string; 
    createdAt: string; 
    updatedAt: string; 
  }
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ name, email, password }: SignupPayload, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }
      return data.user; 
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }: ForgotPasswordPayload, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/password/forget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to send reset link");
      }
      return data.message; // "Reset link sent to your email"
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, newPassword }: ResetPasswordPayload, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/password/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password");
      }
      return data.message; // "Password reset successful"
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
interface AuthState {
  loading: boolean;
  user: User | null;
  error: string | null;
  resetMessage: string | null; // Forgot/reset ke liye message
}

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
        state.resetMessage = action.payload; // "Reset link sent"
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.resetMessage = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.resetMessage = action.payload; // "Password reset successful"
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;