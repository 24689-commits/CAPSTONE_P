// authService.js
import { ref } from 'vue';

const token = ref(null);

export function setAuthToken(newToken) {
  token.value = newToken;
}

export function getAuthToken() {
  return token.value;
}

export function clearAuthToken() {
  token.value = null;
}

export function isAuthenticated() {
  return !!getAuthToken();
}
