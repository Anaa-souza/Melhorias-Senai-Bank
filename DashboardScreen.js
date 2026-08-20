import React, { useState } from "react";
import { Alert, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function DashboardScreen({ route, navigation }) {
  const email = route.params?.email || "estudante@senai.br";

  // Estados
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("Entrada");
  const [categoria, setCategoria] = useState("Outros");
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [tela, setTela] = useState("inicio");

  // Auxiliares e Cálculos
  function avisar(titulo, mensagem) {
    if (Platform.OS === "web") alert(`${titulo}\n${mensagem}`);
    else Alert.alert(titulo, mensagem);
  }

  const formatarMoeda = (val) => Number(val).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const saldo = movimentacoes.reduce((acc, item) => item.tipo === "Entrada" ? acc + item.valor : acc - item.valor, 0);
  const receitas = movimentacoes.reduce((acc, item) => item.tipo === "Entrada" ? acc + item.valor : acc, 0);
  const despesas = movimentacoes.reduce((acc, item) => item.tipo === "Saída" ? acc + item.valor : acc, 0);

  function limparCampos() {
    setDescricao("");
    setValor("");
    setTipo("Entrada");
    setCategoria("Outros");
  }

  function addMovement() {
    const valorNumerico = Number(valor.replace(",", "."));

    if (descricao.trim() === "") return avisar("Atenção", "Digite uma descrição para a movimentação.");
    if (!Number.isFinite(valorNumerico) || valorNumerico <= 0) return avisar("Atenção", "Digite um valor válido.");
    if (tipo === "Saída" && valorNumerico > saldo) {
      return avisar("Operação não permitida!", "Saldo insuficiente para realizar esta despesa.");
    }

    const agora = new Date();
    const novaMovimentacao = {
      id: Date.now().toString(),
      descricao: descricao.trim(),
      categoria,
      tipo,
      valor: valorNumerico,
      data: agora.toLocaleDateString("pt-BR"),
      hora: agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    };

    setMovimentacoes((listaAtual) => [novaMovimentacao, ...listaAtual]);
    limparCampos();
    setTela("inicio");
  }

  // --- RENDERIZADORES DE TELA ---
  function renderInicio() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.inicio}>
        <Text style={styles.boasVindas}>Olá, {email}</Text>
        <View style={styles.card}>
          <Text style={styles.rotuloSaldo}>Saldo atual</Text>
          <Text style={styles.saldo}>{formatarMoeda(saldo)}</Text>
          <View style={styles.resumoLinha}>
            <View style={styles.resumoItem}>
              <Text style={styles.rotuloResumo}>Receitas</Text>
              <Text style={styles.receita}>{formatarMoeda(receitas)}</Text>
            </View>
            <View style={styles.resumoItemDireita}>
              <Text style={styles.rotuloResumo}>Despesas</Text>
              <Text style={styles.despesa}>{formatarMoeda(despesas)}</Text>
            </View>
          </View>
          <Text style={styles.contador}>Movimentações realizadas: {movimentacoes.length}</Text>
        </View>

        <TouchableOpacity style={styles.botaoNovaMovimentacao} onPress={() => setTela("movimentacao")}>
          <Text style={styles.textoBotao}>+ Nova movimentação</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoExtrato} onPress={() => setTela("extrato")}>
          <Text style={styles.textoBotao}>Ver extrato</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  function renderMovimentacao() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.conteudo}>
        <Text style={styles.titulo}>Nova movimentação</Text>

        <Text style={styles.label}>Descrição</Text>
        <TextInput style={styles.input} placeholder="Ex: Material escolar" value={descricao} onChangeText={setDescricao} />

        <Text style={styles.label}>Valor</Text>
        <TextInput style={styles.input} placeholder="Ex: 120,00" value={valor} onChangeText={setValor} keyboardType="decimal-pad" />

        <Text style={styles.label}>Tipo</Text>
        <View style={styles.linhaOpcoes}>
          <TouchableOpacity style={[styles.opcao, tipo === "Entrada" && styles.opcaoSelecionada]} onPress={() => setTipo("Entrada")}>
            <Text style={[styles.textoOpcao, tipo === "Entrada" && styles.textoOpcaoSelecionada]}>Receita</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.opcao, tipo === "Saída" && styles.opcaoSelecionada]} onPress={() => setTipo("Saída")}>
            <Text style={[styles.textoOpcao, tipo === "Saída" && styles.textoOpcaoSelecionada]}>Despesa</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Categoria</Text>
        <View style={styles.categorias}>
          {["Alimentação", "Transporte", "Educação", "Salário", "Lazer", "Outros"].map((item) => (
            <TouchableOpacity key={item} style={[styles.categoria, categoria === item && styles.categoriaSelecionada]} onPress={() => setCategoria(item)}>
              <Text style={[styles.textoCategoria, categoria === item && styles.textoCategoriaSelecionada]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.botaoSalvar} onPress={addMovement}>
          <Text style={styles.textoBotao}>SALVAR MOVIMENTAÇÃO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoLimpar} onPress={limparCampos}>
          <Text style={styles.textoBotaoLimpar}>LIMPAR CAMPOS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => setTela("inicio")}>
          <Text style={styles.textoVoltar}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  function renderExtrato() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.conteudo}>
        <Text style={styles.titulo}>Extrato</Text>
        <View style={styles.resumoExtrato}>
          <Text style={styles.resumoTitulo}>Resumo da conta</Text>
          <Text style={styles.saldoExtrato}>Saldo atual: {formatarMoeda(saldo)}</Text>
          <Text style={styles.receitaExtrato}>Receitas: {formatarMoeda(receitas)}</Text>
          <Text style={styles.despesaExtrato}>Despesas: {formatarMoeda(despesas)}</Text>
          <Text style={styles.contadorExtrato}>Movimentações realizadas: {movimentacoes.length}</Text>
        </View>

        {movimentacoes.length === 0 ? (
          <Text style={styles.semMovimentacoes}>Nenhuma movimentação realizada.</Text>
        ) : (
          movimentacoes.map((item) => {
            const isEntrada = item.tipo === "Entrada";
            return (
              <View key={item.id} style={styles.itemMovimentacao}>
                <View style={styles.cabecalhoItem}>
                  <Text style={styles.descricao}>{item.descricao}</Text>
                  <Text style={[styles.valorMovimentacao, isEntrada ? styles.valorEntrada : styles.valorSaida]}>
                    {isEntrada ? "+ " : "- "}{formatarMoeda(item.valor)}
                  </Text>
                </View>
                <Text style={styles.info}>Categoria: {item.categoria}</Text>
                <Text style={styles.info}>Tipo: {isEntrada ? "Receita" : "Despesa"}</Text>
                <Text style={styles.info}>Data: {item.data} – {item.hora}</Text>
              </View>
            );
          })
        )}

        <TouchableOpacity style={styles.botaoVoltar} onPress={() => setTela("inicio")}>
          <Text style={styles.textoVoltar}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      {tela === "inicio" && renderInicio()}
      {tela === "movimentacao" && renderMovimentacao()}
      {tela === "extrato" && renderExtrato()}

      <TouchableOpacity style={styles.botaoSair} onPress={() => navigation.goBack()}>
        <Text style={styles.textoSair}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6", padding: 30 },
  inicio: { paddingBottom: 90 },
  boasVindas: { fontSize: 30, fontWeight: "bold", color: "#111827", marginBottom: 18 },
  card: { backgroundColor: "#FFFFFF", borderRadius: 22, padding: 30, marginBottom: 22 },
  rotuloSaldo: { fontSize: 20, color: "#6B7280", fontWeight: "600" },
  saldo: { fontSize: 46, fontWeight: "bold", color: "#111827", marginTop: 12, marginBottom: 35 },
  resumoLinha: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  resumoItem: { alignItems: "flex-start" },
  resumoItemDireita: { alignItems: "flex-end" },
  rotuloResumo: { fontSize: 20, color: "#6B7280", fontWeight: "600" },
  receita: { color: "#10B981", fontSize: 24, fontWeight: "bold", marginTop: 8 },
  despesa: { color: "#EF4444", fontSize: 24, fontWeight: "bold", marginTop: 8 },
  contador: { fontSize: 20, fontWeight: "bold", color: "#374151", marginTop: 35 },
  botaoNovaMovimentacao: { backgroundColor: "#E31B23", paddingVertical: 17, borderRadius: 10, marginBottom: 14 },
  botaoExtrato: { backgroundColor: "#064B80", paddingVertical: 17, borderRadius: 10 },
  textoBotao: { color: "#FFFFFF", textAlign: "center", fontSize: 16, fontWeight: "bold" },
  conteudo: { paddingBottom: 90 },
  titulo: { fontSize: 27, fontWeight: "bold", color: "#064B80", marginBottom: 22 },
  label: { fontSize: 15, fontWeight: "bold", color: "#374151", marginBottom: 7 },
  input: { backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#D1D5DB", borderRadius: 10, padding: 14, fontSize: 16, marginBottom: 15 },
  linhaOpcoes: { flexDirection: "row", gap: 10, marginBottom: 18 },
  opcao: { flex: 1, borderWidth: 1, borderColor: "#D1D5DB", borderRadius: 10, padding: 13, alignItems: "center", backgroundColor: "#FFFFFF" },
  opcaoSelecionada: { backgroundColor: "#064B80", borderColor: "#064B80" },
  textoOpcao: { color: "#374151", fontWeight: "bold" },
  textoOpcaoSelecionada: { color: "#FFFFFF" },
  categorias: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 20 },
  categoria: { borderWidth: 1, borderColor: "#D1D5DB", borderRadius: 20, paddingVertical: 9, paddingHorizontal: 13, backgroundColor: "#FFFFFF" },
  categoriaSelecionada: { backgroundColor: "#064B80", borderColor: "#064B80" },
  textoCategoria: { color: "#374151", fontSize: 13 },
  textoCategoriaSelecionada: { color: "#FFFFFF", fontWeight: "bold" },
  botaoSalvar: { backgroundColor: "#E31B23", padding: 16, borderRadius: 10, marginBottom: 10 },
  botaoLimpar: { backgroundColor: "#D1D5DB", padding: 16, borderRadius: 10, marginBottom: 10 },
  textoBotaoLimpar: { color: "#374151", textAlign: "center", fontSize: 15, fontWeight: "bold" },
  botaoVoltar: { backgroundColor: "#064B80", padding: 15, borderRadius: 10, marginTop: 10 },
  textoVoltar: { color: "#FFFFFF", textAlign: "center", fontWeight: "bold" },
  resumoExtrato: { backgroundColor: "#FFFFFF", padding: 20, borderRadius: 14, marginBottom: 18 },
  resumoTitulo: { fontSize: 18, fontWeight: "bold", color: "#374151", marginBottom: 12 },
  saldoExtrato: { color: "#064B80", fontWeight: "bold", marginBottom: 6 },
  receitaExtrato: { color: "#10B981", marginBottom: 6 },
  despesaExtrato: { color: "#EF4444", marginBottom: 6 },
  contadorExtrato: { color: "#374151", fontWeight: "bold", marginTop: 5 },
  semMovimentacoes: { textAlign: "center", color: "#6B7280", marginTop: 20 },
  itemMovimentacao: { backgroundColor: "#FFFFFF", borderRadius: 12, padding: 15, marginBottom: 10 },
  cabecalhoItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 },
  descricao: { flex: 1, fontSize: 16, fontWeight: "bold", color: "#1F2937", marginRight: 10 },
  valorMovimentacao: { fontSize: 16, fontWeight: "bold" },
  valorEntrada: { color: "#10B981" },
  valorSaida: { color: "#EF4444" },
  info: { color: "#6B7280", fontSize: 13, marginTop: 3 },
  botaoSair: { position: "absolute", bottom: 15, left: 30, right: 30, backgroundColor: "#111827", padding: 13, borderRadius: 10 },
  textoSair: { color: "#FFFFFF", textAlign: "center", fontWeight: "bold" },
});