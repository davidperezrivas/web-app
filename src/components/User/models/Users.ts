import Role from "./Role";

export default interface User {
  id: string;
  name: string;
  rut: string;
  email: string;
  password: string;
  is_active: boolean;
  role: Role
}

export default interface UserModal {
  name: string;
  rut: string;
  email: string;
}
