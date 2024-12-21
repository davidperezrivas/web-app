export interface ModalProps {
  closeEvent: React.Dispatch<React.SetStateAction<boolean>>;
  errorEvent: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  id: string;
}

export type Inputs = {
  name: string;
};

export interface ModalDeleteProps {
  closeEvent: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}
