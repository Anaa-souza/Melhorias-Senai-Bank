// ===============================================
// SENAI BANK - Aula 04
// Objetivo: configurar navegação entre Login e Dashboard.
// ===============================================

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: "SENAI Bank" }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: "Minha Conta" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}