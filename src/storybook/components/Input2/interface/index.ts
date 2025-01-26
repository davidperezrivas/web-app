export interface InputProps {
  /* Nombre / id del boton */
  tittle: string;

  /* Nombre / id del boton */
  name: string;

  /*
   *  Mensaje de error
   *
   */
  errors?: any;

  /*
   *  Valor del input
   *
   */
  control: any;

  /*
   *  placeholder
   *
   */
  placeholder: string;

  /*
   *  type
   *
   */
  type?: string;
}
