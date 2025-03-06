import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Url {
  id: string;
  originalUrl: string;
  shortCode: string;
  userId?: string;
  visits: { id: string; visitedAt: string }[];
  isActive: boolean;
  qrCode?: string | undefined;
  createdAt: string;
}

interface UrlState {
  urls: Url[];
  trialUrls: Url[];
  loading: boolean;
  error: string | null;
  shortenedUrl: string | null;
  isSlugAvailable: boolean | null;
}

const initialState: UrlState = {
  urls: [],
  trialUrls: [],
  loading: false,
  error: null,
  shortenedUrl: null,
  isSlugAvailable: null,
};

// Thunk to shorten URL
export const shortenUrl = createAsyncThunk(
  "urls/shortenUrl",
  async (
    { originalUrl, customSlug }: { originalUrl: string; customSlug?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl, customSlug }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to shorten URL");
      }
      return { shortUrl: data.shortUrl, url: data.url }; // Expecting shortUrl and url
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

// Thunk to check slug availability
export const checkSlugAvailability = createAsyncThunk(
  "urls/checkSlugAvailability",
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/checkSlug?slug=${slug}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Slug check failed");
      }
      return data.isAvailable;
    } catch (error: any) {
      return rejectWithValue(error.message || "Error checking slug");
    }
  }
);
export const updateUrl = createAsyncThunk(
  "url/updateUrl",
  async (
    { id, originalUrl, isActive }: { id: string; originalUrl: string; isActive: boolean },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch("/api/updateUrl", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, originalUrl, isActive }),
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        console.error("Update API error:", data);
        return rejectWithValue(data.message || "Failed to update URL");
      }
      return data; // Should return the updated URL
    } catch (error: any) {
      console.error("Network error in updateUrl:", error);
      return rejectWithValue(error.message || "Network error occurred");
    }
  }
);

export const deleteUrl = createAsyncThunk(
  "url/deleteUrl",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/deleteUrl", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
        credentials: "include",
      });
      const data = await response.json().catch(() => ({})); // Fallback to empty object if JSON parsing fails
      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to delete URL");
      }
      return { id };
    } catch (error: any) {
      console.error("Fetch error in deleteUrl:", error);
      return rejectWithValue(error.message || "Network error occurred");
    }
  }
);

export const fetchTrialUrls = createAsyncThunk("url/fetchTrialUrls", async (_, { rejectWithValue }) => {
  const response = await fetch("/api/trialUrls", { credentials: "include" });
  const data = await response.json();
  if (!response.ok) return rejectWithValue(data.error || "Failed to fetch trial URLs");
  return data;
});

export const fetchUrls = createAsyncThunk("url/fetchUrls", async (_, { rejectWithValue }) => {
  const response = await fetch("/api/urls", { credentials: "include" });
  const data = await response.json();
  if (!response.ok) return rejectWithValue(data.error || "Failed to fetch URLs");
  return data;
});

export const generateQrCode = createAsyncThunk(
  "url/generateQrCode",
  async (shortCode: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/qr/${shortCode}`, { credentials: "include" });
      const data = await response.json();
      if (!response.ok) return rejectWithValue(data.error || "Failed to generate QR code");
      return { shortCode, qrCode: data.qrCode };
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

const urlSlice = createSlice({
  name: "urlSlice",
  initialState,
  reducers: {
    resetShortenState: (state) => {
      state.shortenedUrl = null;
      state.isSlugAvailable = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Shorten URL
      .addCase(shortenUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.shortenedUrl = null;
      })
      .addCase(shortenUrl.fulfilled, (state, action) => {
        state.loading = false;
        state.shortenedUrl = action.payload.shortUrl;
        if (action.payload.url) {
          const newUrl = action.payload.url;
          if (newUrl.userId) {
            state.urls.push(newUrl);
          } else {
            state.trialUrls.push(newUrl);
          }
        }
      })
      .addCase(shortenUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Check Slug Availability
      .addCase(checkSlugAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isSlugAvailable = null;
      })
      .addCase(checkSlugAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.isSlugAvailable = action.payload;
      })
      .addCase(checkSlugAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isSlugAvailable = false;
      })

      // Fetch Trial URLs
      .addCase(fetchTrialUrls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrialUrls.fulfilled, (state, action) => {
        state.loading = false;
        state.trialUrls = action.payload;
      })
      .addCase(fetchTrialUrls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch URLs
      .addCase(fetchUrls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUrls.fulfilled, (state, action) => {
        state.loading = false;
        state.urls = action.payload;
      })
      .addCase(fetchUrls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete URL
      .addCase(deleteUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUrl.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload;
        state.urls = state.urls.filter((url) => url.id !== id);
        state.trialUrls = state.trialUrls.filter((url) => url.id !== id);
      })
      .addCase(deleteUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? String(action.payload) : "Unknown error occurred";
      })

      // Update URL
      .addCase(updateUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUrl.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUrl = action.payload;
        const index = state.urls.findIndex((url) => url.id === updatedUrl.id);
        if (index !== -1) {
          state.urls[index] = updatedUrl;
        }
      })
      .addCase(updateUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Generate QR Code
      .addCase(generateQrCode.fulfilled, (state, action) => {
        const { shortCode, qrCode } = action.payload;
        const urlIndex = state.urls.findIndex((url) => url.shortCode === shortCode);
        const trialUrlIndex = state.trialUrls.findIndex((url) => url.shortCode === shortCode);
        if (urlIndex !== -1) state.urls[urlIndex].qrCode = qrCode;
        if (trialUrlIndex !== -1) state.trialUrls[trialUrlIndex].qrCode = qrCode;
      })
      .addCase(generateQrCode.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { resetShortenState } = urlSlice.actions;
export default urlSlice.reducer;