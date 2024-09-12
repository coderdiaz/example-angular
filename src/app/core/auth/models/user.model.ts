export interface User {
  jwt: string;
  user: {
    username: string;
    email: string;
  };
}