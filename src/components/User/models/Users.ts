import Subscription from '../../Subscription/models/Subscription';

export default interface User {
  id: string;
  name: string;
  rut: string;
  email: string;
  password: string;
  is_active: boolean;
  subscription: Subscription;
  phone_number: string;
  date_of_birth: string;
}

export default interface UserModal {
  name: string;
  rut: string;
  email: string;
}
