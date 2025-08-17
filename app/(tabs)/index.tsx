import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "../../src/context/AuthContext";

export default function HomeScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue 👋</Text>
      <Text style={{ marginBottom: 20 }}>{user?.email}</Text>

      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, gap: 12 },
  title: { fontSize: 22, fontWeight: "700", textAlign: "center" },
  button: { backgroundColor: "#dc3545", padding: 14, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "white", fontWeight: "700" }
});
