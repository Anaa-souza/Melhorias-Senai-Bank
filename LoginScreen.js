import { useState } from "react";
import { Alert, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function avisar(titulo, mensagem) {
    if (Platform.OS === "web") {
      alert(`${titulo}\n${mensagem}`);
    } else {
      Alert.alert(titulo, mensagem);
    }
  }

  function entrar() {
    // Regex para validar E-mail
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Regex para Senha: Exige pelo menos 1 letra, 1 número e no mínimo 6 caracteres
    const regexSenha = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    // Validação do E-mail
    if (!regexEmail.test(email.trim())) {
      avisar("E-mail Inválido", "Por favor, digite um e-mail válido (ex: aluno@senai.br).");
      return;
    }

    // Validação da Senha
    if (!regexSenha.test(senha.trim())) {
      avisar("Senha Inválida", "A senha deve conter pelo menos 6 caracteres, incluindo letras e números.");
      return;
    }

    // Se as validações passarem
    navigation.navigate("Dashboard", { email: email.trim() });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>SENAI Bank</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        // Removemos maxLength={4} e keyboardType="numeric" para permitir letras e senhas maiores
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.botao} onPress={entrar}>
        <Text style={styles.textoBotao}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#D71920", padding: 24, justifyContent: "center" },
  logo: { color: "#fff", fontSize: 36, fontWeight: "bold", textAlign: "center", marginBottom: 24 },
  input: { backgroundColor: "#fff", borderRadius: 12, padding: 16, marginBottom: 12, fontSize: 16 },
  botao: { backgroundColor: "#111827", padding: 16, borderRadius: 12 },
  textoBotao: { color: "#fff", textAlign: "center", fontWeight: "bold", fontSize: 17 },
});