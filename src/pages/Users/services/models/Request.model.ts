export interface CreateUserModel {
  name: string;
  rut: string;
  email: string;
  password: string;
}

export interface UpdateUserModel extends CreateUserModel {
  id: string;
}
