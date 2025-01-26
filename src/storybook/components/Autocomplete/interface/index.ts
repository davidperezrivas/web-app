export interface DropdownProps {
  /* Campos a desplegar */
  fields: any[];

  /* Nombre del componente  */
  name: string;

  /* Titulo del dropdpwn*/
  tittle?: string;

  /* Controlador del formulario */
  control?: any;

  /*
   *  Mensaje de error
   *
   */
  error?: any;

  /*
   *  funcion para el onchange
   *
   */
  onChangeFunction?: any;
}
