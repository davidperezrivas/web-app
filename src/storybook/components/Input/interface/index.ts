export interface InputProps {
  /* Nombre / id del boton */
  tittle: string;

  /* Nombre / id del boton */
  name: string;

  /* Texto que aparece en el input */
  placeholders: string;

  /*
   * tipo boton
   * Error
   * info
   */

  style: 'error' | 'info';

  /*
   *  Icono que se desea mostrar
   *
   */
  icon?: any;

  /*
   *  Mensaje de error
   *
   */
  error?: any;

  /*
   *  Valor del input
   *
   */
  register: any;

  /*
   *  tipo de input
   *
   */
  type: string;
}
