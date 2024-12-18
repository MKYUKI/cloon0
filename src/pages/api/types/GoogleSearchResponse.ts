// src/types/GoogleSearchResponse.ts

export interface GoogleSearchItem {
    title: string;
    link: string;
  }
  
  export interface GoogleSearchResponse {
    items: GoogleSearchItem[];
  }
  