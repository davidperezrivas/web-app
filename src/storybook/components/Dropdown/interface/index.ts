export interface DropdownProps {
  /* Campos a desplegar */
  fields: any[] | undefined;

  /* Nombre del componente  */
  name: string;

  /* Titulo del dropdpwn*/
  tittle: string;

  /* Controlador del formulario */
  control: any;

  /*
   * Apariencia del  boton
   * Error
   * info
   */

  appearance: 'error' | 'info';

  /*
   *  Mensaje de error
   *
   */
  error?: any;
}
