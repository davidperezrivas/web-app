export interface ButtonProps {
  /**
   * Texto que aparece en el noton
   */
  text: string;

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

  type: 'error' | 'success' | 'warning' | 'info';
  /*
   *  Icono que se desea mostar
   *
   */
  icon?: any;
}
