export default interface IDebt {
  total: number;
  user: User;
}

interface User {
  name: string;
  rut: string;
  email: string;
}
