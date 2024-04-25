export interface ButtonProps {
  /**
   * Texto que aparece en el noton
   */
  text: string;

  /**
   * Tipo de boton
   */
  type?: any;

  /**
   * Funcion a ejecutar
   */

  onClick?: (event: any) => void;
  /**
   * tipo boton
   * Error
   * Success
   * Warning
   * Info
   */

  status: 'error' | 'success' | 'warning' | 'info';
  /*
   *  Icono que se desea mostar
   *
   */
  icon?: any;
}
