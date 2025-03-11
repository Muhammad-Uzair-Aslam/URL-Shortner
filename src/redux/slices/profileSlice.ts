import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProfileProps,updateProfilePayload } from "@/types/types";
const initialState: ProfileProps = {
  loading: false,
  error: null,
  message: null,
};

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async ({ name, email }: updateProfilePayload, { rejectWithValue }) => {
    const response = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    const data = await response.json();
    if (!response.ok) {
      return rejectWithValue(data.error || "Failed to update profile");
    }
    return data.message;
  }
);

export const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {
    resetProfileState: (state) => {
      state.error = null;
      state.loading = false;
      state.message = null;
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(updateProfile.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.message = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetProfileState } = profileSlice.actions;
export default profileSlice.reducer;
