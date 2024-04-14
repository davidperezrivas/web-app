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
