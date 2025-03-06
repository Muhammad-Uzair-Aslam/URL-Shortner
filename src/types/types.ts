export interface Url {
    id: string;
    originalUrl: string;
    shortCode: string;
    userId?: string | null; 
    visits: { id: string; visitedAt: string }[];
    isActive: boolean;
    qrCode?: string | null;
    createdAt: string;
  }