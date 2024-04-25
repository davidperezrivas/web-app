export default interface User {
  id: string;
  name: string;
  rut: string;
  email: string;
  password: string;
  isactive: boolean;
}

export default interface UserModal {
  name: string;
  rut: string;
  email: string;
}
