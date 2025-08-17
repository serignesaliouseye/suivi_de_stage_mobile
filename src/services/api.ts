// src/services/api.ts
const API_URL = "http://192.168.1.17:8000/api/v1"; 
// ⚠️ remplace 192.168.X.X par l'adresse IP de ta machine (si tu testes sur mobile)

export async function registerUser(name: string, email: string, password: string, confirmPassword: string) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({ name, email, password, password_confirmation: confirmPassword,role: "etudiant"}),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erreur lors de l'inscription");
  }

  return await response.json(); // retour des données (user + token si backend envoie ça)
}

export async function loginUser(email: string, password: string) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erreur lors de la connexion");
  }

  return await response.json();
}
