export type Url ={
    id: string;
    originalUrl: string;
    shortCode: string;
    userId?: string | null; 
    visits: { id: string; visitedAt: string }[];
    isActive: boolean;
    qrCode?: string | null;
    createdAt: string;
  }
  
export type UrlState ={
    urls: Url[];
    trialUrls: Url[];
    loading: boolean;
    error: string | null;
    shortenedUrl: string | null;
    isSlugAvailable: boolean | null;
  }
  export type ProfileProps = {
    loading: boolean;
    error: string | null;
    message: string | null;
  };
  export type updateProfilePayload = {
    name: string;
    email: string;
  };
  export type SignupPayload ={
    name: string;
    email: string;
    password: string;
  }
  export type ForgotPasswordPayload ={
    email: string;
  }
  export type ResetPasswordPayload ={
    token: string;
    newPassword: string;
  }
  export type ChangePasswordPayload ={
    email: string;
    oldPassword: string;
    newPassword: string;
  }
  export type User ={
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
  export type AuthState ={
    loading: boolean;
    user: User | null;
    error: string | null;
    resetMessage: string | null;
  }
  export type AutoPasteClipboardProps ={
    urlToCopy?: string;
  }
  export type InputFieldProps ={
    type: string;
    placeholder: string;
    width?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string | null | undefined;
    disabled?: boolean;
  }
  export type CustomSlugInputProps ={
    title: string;
    placeholder: string;
    fetchAction: "trial" | "urls";
  }
  