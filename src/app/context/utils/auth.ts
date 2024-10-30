import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
  }

export const setToken = (token: string) => {
  if (typeof window === 'undefined') {
    return;
  }
  Cookies.set('token', token, { expires: 7 }); // El token expira en 7 días
}

export const unsetToken = () => {
  if (typeof window === 'undefined') {
    return;
  }
  Cookies.remove('token');
}

export const getToken = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  return Cookies.get('token');
}

export const setUser = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user));
}

export const unsetUser = () => {
  localStorage.removeItem('user');
}

export const getUser = (): User | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  
  try {
    const decodedToken = jwtDecode(token);
    if (!decodedToken || !decodedToken.exp) return false;
    
    return decodedToken.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
}