

export interface MMpox{
    
    creationDate: Date | null;
    lat: number;
    lng: number;
    genre: string;
    age: number;
    isSent: boolean;
}

export interface MMpoxDocument extends Document, MMpox {}