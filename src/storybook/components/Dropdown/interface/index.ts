export interface InputProps {
  /* Nombre / id del boton */
  tittle: string;

  /* Nombre / id del boton */
  name: string;

  /* Texto que aparece en el input */
  placeholders: string;

  /*
   * Apariencia del  boton
   * Error
   * info
   */

  appearance: 'error' | 'info';

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
