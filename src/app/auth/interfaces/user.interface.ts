export interface User {
  id?: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role: 'admin' | 'cashier';
  password?: string; // Opcional, solo para enviar al registrar/editar
}
