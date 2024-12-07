export interface ModalUserProps {
  closeEvent: React.Dispatch<React.SetStateAction<boolean>>;
  errorEvent: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  id: string;
}

export type Inputs = {
  name: string;
  rut: string;
  email: string;
  password: string;
  role: string;
  confirmPassword: string;
  changePassword: boolean;
  subscription: string;
  phone_number: string;
  date_of_birth: string;
};

export interface ModalDeleteUserProps {
  closeEvent: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}
