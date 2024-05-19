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
  confirmPassword: string;
  changePassword: boolean;
};

export interface ModalDeleteUserProps {
  closeEvent: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}
