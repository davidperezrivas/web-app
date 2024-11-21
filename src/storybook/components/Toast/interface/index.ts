export interface ToastProps {
  /**
   * Texto que aparece en el noton
   */
  text: string;

  /**
   * Tipo de Toast
   * success
   * error
   * info
   * warning
   */
  type: 'error' | 'success' | 'warning' | 'info';
}

export interface IToast {
  /**
   * Texto que aparece en el noton
   */
  error: string;

  /**
   * Tipo de Toast
   * success
   * error
   * info
   * warning
   */
  type: 'error' | 'success' | 'warning' | 'info';

  /**
   * opción para mostrar u ocultar toast
   */
  show: Boolean;
}
