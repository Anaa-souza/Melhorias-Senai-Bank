# 🏦 SENAI Bank — Evolução da Aplicação Mobile

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-0.72+-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-000000?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Status-Conclu%C3%ADdo-10B981?style=for-the-badge" alt="Status" />
</p>

---

## 📌 Sobre o Projeto

O **SENAI Bank** é um aplicativo de controle financeiro pessoal desenvolvido em **React Native**. Esta versão representa a **evolução da aplicação original**, implementando novas regras de negócio essenciais, validações rigorosas de saldo, categorização de receitas/despesas e contadores automáticos.

Projetado para oferecer uma experiência fluida de gerenciamento de conta, o aplicativo calcula balanços em tempo real e armazena o histórico completo de transações diretamente em seu extrato.

---

## 🚀 Funcionalidades & Desafios Implementados

### 🏷️ 1. Categorização de Movimentações
Toda nova receita ou despesa deve possuir uma categoria obrigatória (ex: *Alimentação, Transporte, Educação, Salário, Lazer, Outros*). A categoria selecionada é vinculada à transação e exibida no extrato detalhado.

### 🛡️ 2. Validação Anti-Saldo Negativo
O aplicativo impede que despesas superem o saldo disponível. Caso o valor da despesa exceda o saldo atual, a operação é bloqueada imediatamente via *Guard Clause*, exibindo o alerta:
> 🔴 **Operação não permitida!**  
> *Saldo insuficiente para realizar esta despesa.*

### 🧹 3. Limpeza de Formulário
Disponibilização do botão **LIMPAR CAMPOS** no formulário de cadastro, permitindo resetar instantaneamente as entradas do usuário via `useState` sem alterar o saldo ou salvar nada no extrato.

### 📊 4. Extrato Completo e Formatado
Apresentação detalhada do histórico financeiro com:
- Formatação monetária brasileira (`R$ 1.500,00`)
- Sinalização clara de fluxo (`+` verde para Receita, `-` vermelho para Despesa)
- Data e horário exatos da transação

### 🔢 5. Contador Automático
Monitoramento e atualização automática da quantidade total de movimentações efetuadas na conta, alterando o estado a cada novo cadastro.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade |
| :--- | :--- |
| **React Native** | Framework para desenvolvimento mobile multiplataforma. |
| **React Navigation** | Gerenciamento de rotas e navegação de telas (`Stack`). |
| **JavaScript (ES6+)** | Lógica de programação, manipulação de arrays e Hooks. |
| **StyleSheet** | Estilização nativa com layout Flexbox. |

---

## 💡 Explicação Técnica dos Conceitos Usados

Esta seção descreve a arquitetura do código desenvolvida para a avaliação individual:

* 🔄 **`useState`**: Hook responsável pelo gerenciamento de estado reativo do aplicativo. Controla as entradas de texto (`descricao`, `valor`), o fluxo de navegação interno (`tela`) e a lista acumulativa de transações (`movimentacoes`).
* ➕ **`setMovimentacoes`**: Atualizador do estado da lista. Utiliza imutabilidade e a sintaxe de spread `[novaMovimentacao, ...listaAtual]` para adicionar a nova transação no topo do extrato mantendo os registros anteriores.
* 🎯 **`addMovement()`**: Função central do cadastro responsável por receber a entrada do usuário, converter strings numéricas (`.replace(",", ".")`), validar regras de negócio e acionar os disparadores de estado.
* 🔢 **`Number.isFinite`**: Método de validação rigoroso para garantir que o valor inserido seja um número numérico válido e maior que zero, evitando erros do tipo `NaN` ou valores vazios.
* 🛑 **`if` e `return` (Cláusulas de Guarda)**: Estruturas condicionais utilizadas no início das funções para interromper a execução do salvamento caso alguma validação (campos vazios ou saldo insuficiente) falhe.
* 🧮 **Cálculo do Saldo (`.reduce()`)**: O saldo consolidado, o acumulado de receitas e o acumulado de despesas são calculados dinamicamente a cada renderização utilizando a função `.reduce()` sobre o array de movimentações.
* 🧭 **`navigation.navigate()` / `navigation.goBack()`**: Funções fornecidas pela biblioteca de navegação para alternar telas no aplicativo e encerrar a sessão do usuário no botão **Sair**.

---

## 📋 Placa de Testes Obrigatórios

Para validar o funcionamento do aplicativo, os seguintes testes automatizados/manuais foram executados com sucesso:

- [x] **Teste 1 (Receita):** Cadastro de receita de R$ 1.500,00. Atualização imediata do saldo para R$ 1.500,00, contador em 1 e registro no extrato.
- [x] **Teste 2 (Despesa Válida):** Cadastro de despesa de R$ 200,00. Atualização do saldo para R$ 1.300,00, despesas em R$ 200,00, contador em 2 e extrato atualizado.
- [x] **Teste 3 (Saldo Insuficiente):** Tentativa de cadastro de despesa de R$ 2.000,00. A transação foi recusada com aviso visual e o saldo mantido em R$ 1.300,00.
- [x] **Teste 4 (Limpeza):** Preenchimento de campos e acionamento do botão **Limpar Campos**. Verificação de redefinição sem afetar o extrato.
- [x] **Teste 5 (Integridade do Extrato):** Confirmação de que apenas as 2 movimentações válidas constam no histórico final.

---



## 💻 Como Instalar e Executar o Projeto

Siga o passo a passo no terminal para clonar, acessar a pasta do projeto, instalar as dependências e iniciar a aplicação:

```bash
# 1. Clone este repositório
git clone [https://github.com/SEU-USUARIO/senai-bank.git](https://github.com/SEU-USUARIO/senai-bank.git)

# 2. Acesse o diretório do projeto
cd senai-bank

# 3. Instale as dependências do projeto
npm install

# 4. Inicie o servidor de desenvolvimento do Expo
npx expo start
