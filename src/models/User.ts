import Post  from "./Post";

export default interface User {
  id: number;
  name: string;
  email: string;             // email == user
  photoUrl: string;
  password: string;
  post?: Post | null;
}