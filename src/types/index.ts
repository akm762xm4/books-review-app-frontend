export interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  publishedYear: number;
  averageRating: number;
  totalReviews: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface BookFormData {
  title: string;
  author: string;
  description: string;
  publishedYear: number;
}

export interface Review {
  _id: string;
  user: {
    name: string;
    _id: string;
  };
  book: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}
export interface UserReview {
  _id: string;
  user: string;
  book: {
    title: string;
    author: string;
    _id: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  _id: string;
  user: {
    name: string;
    _id: string;
  };
  book: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubmitReview {
  user: string | undefined;
  book: string;
  rating: number;
  comment: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isAdmin: boolean;
}

export interface AuthCredentials {
  email: string;
  password?: string;
  _id: string | undefined;
  name?: string;
  isAdmin?: boolean;
  token: string;
}
