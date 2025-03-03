import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
interface SignupPayload {
  name: string;
  email: string;
  password: string;
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

interface AuthState {
  loading: boolean;
  user:  User|null; 
  error: any | null; 
}

const initialState: AuthState = {
  loading: false,
  user: null,
  error: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.loading = false;
      state.user = null;
      state.error = null;
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
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;