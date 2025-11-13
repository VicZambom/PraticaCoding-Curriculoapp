import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { PaperProvider, Appbar, Card, Button, Text, Avatar, DefaultTheme } from 'react-native-paper';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// --- Definição de Tipos para Navegação ---
type RootStackParamList = {
  Home: undefined;
  Profile: { name: string }; 
  Experience: undefined;
};

// Define o tipo da propriedade 'navigation' para as telas
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

// Tela Principal
function HomeScreen({ navigation }: { navigation: HomeScreenNavigationProp }) {
  const myName = "Victoria Zambom";

  return (
    <View style={styles.container}>
      <Card style={styles.card}>

        <Card.Content style={styles.homeContent}>
          <Avatar.Icon size={80} icon="account" style={styles.avatar} />
          <Text variant="headlineMedium" style={styles.title}>
            {myName}
          </Text>
          <Text variant="titleMedium" style={styles.subtitle}>
            Desenvolvedora Front-end e Designer UIUX
          </Text>
        </Card.Content>

        <Card.Actions style={styles.actions}>
          <Button
            mode="contained"
            icon="account-circle"
            onPress={() => navigation.navigate('Profile', { name: myName })}
          > Meu Perfil
          </Button>

          <Button
            mode="outlined"
            icon="briefcase"
            style={styles.actionButton}
            onPress={() => navigation.navigate('Experience')}
          > Experiência
          </Button>

        </Card.Actions>
      </Card>
    </View>
  );
}

// 2. Tela de Perfil
function ProfileScreen({ route }: any) {
  const { name } = route.params;

  return (
    <ScrollView style={styles.containerScroll}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineLarge" style={styles.title}>{name}</Text>
          <Text variant="titleMedium" style={styles.subtitle}>
            Sobre Mim
          </Text>
          <Text variant="bodyLarge" style={styles.paragraph}>
            Sou estudante do 3° Período em Análise e Desenvolvimento de Sistemas pela Faculdade SENAC PE, onde ingressei através da bolsa do programa Embarque Digital.

            Atualmente, busco uma oportunidade de estágio em Desenvolvimento Front-end. Meu objetivo é aplicar e aprimorar minhas habilidades em tecnologias como React e TypeScript, ao mesmo tempo em que desenvolvo competências em UI/UX Design.

            Tenho interesse particular em entender como as teorias de design, testes de usabilidade e pesquisas com usuários impactam a qualidade de um produto digital, utilizando ferramentas como o Figma para criar soluções visuais e funcionais.

            Estou motivada a contribuir para projetos desafiadores e a aprender com uma equipe experiente, colaborando para entregar as melhores soluções.
          </Text>
          <Text variant="titleMedium" style={styles.subtitle}>
            Contato
          </Text>
          <Text variant="bodyMedium">Email: victoriazambomg@gmail.com</Text>
          <Text variant="bodyMedium">Telefone: (19) 99194-0263</Text>
          <Text variant="bodyMedium">LinkedIn: https://www.linkedin.com/in/victoriazambomg/</Text>
          <Text variant="bodyMedium">Github: https://github.com/VicZambom</Text>
          <Text variant="bodyMedium">Behance: https://www.behance.net/victoriazambom</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

// 3. Tela de Experiência
function ExperienceScreen() {
  return (
    <ScrollView style={styles.containerScroll}>
      <Card style={styles.card}>
        <Card.Title
          title="Sistema de Gestão para Bombeiros de PE"
          subtitle="Projeto Acadêmico (Agosto 2025 – Presente) 
                    - Designer UI/UX e Desenvolvedora Front-End"
          left={(props) => <Avatar.Icon {...props} icon="laptop" />}
        />
        <Card.Content>
          <Text variant="bodyMedium">
            - Liderança do processo de UI/UX Design, incluindo a criação de Design System e protótipos 
            interativos (desktop) de alta fidelidade no Figma.
          </Text>
          <Text variant="bodyMedium">
            - Arquitetura e desenvolvimento da interface com React e Vite, utilizando Hooks 
            (useState, useEffect) para gerenciamento de estado local.
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title
          title="Sistema de farmácia 'PharmaSet"
          subtitle="Projeto de extensão COMPET (Julho 2025 – Outubro 2025) 
                    - Desenvolvedora Front-End (Bolsista FACEPE)"
          left={(props) => <Avatar.Icon {...props} icon="code-tags" />}
        />
        <Card.Content>
          <Text variant="bodyMedium">
            - Desenvolvimento de componentes para uma Single-Page Application (SPA) em 
            React e TypeScript, traduzindo protótipos do Figma em código funcional. 
          </Text>
          <Text variant="bodyMedium">
            - Implementação de interfaces responsivas utilizando a metodologia utility-first do 
            Tailwind CSS, garantindo consistência visual e escalabilidade.
          </Text>
          <Text variant="bodyMedium">
            - Colaboração em fluxo de trabalho ágil com Git e GitHub (Pull Requests) e 
            documentação de componentes no README. 
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

// --- Configuração da Navegação ---
const Stack = createStackNavigator<RootStackParamList>();

// Tema do React Native Paper
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    secondary: '#03dac4',
  },
};

// --- Componente Principal ---
export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            // Barra de topo (Appbar) 
            screenOptions={{
              header: ({ navigation, route, options, back }) => {
                const title = options.title ?? route.name;
                return (
                  <Appbar.Header>
                    {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
                    <Appbar.Content title={title} />
                  </Appbar.Header>
                );
              },
            }}
          >
            {/* Define as telas */}
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: 'Meu Currículo' }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ title: 'Perfil' }}
            />
            <Stack.Screen
              name="Experience"
              component={ExperienceScreen}
              options={{ title: 'Experiência' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  containerScroll: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 16,
    borderRadius: 8,
  },
  homeContent: {
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    marginBottom: 16,
    backgroundColor: '#6200ee',
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 16,
    textAlign: 'center',
    color: '#666',
  },
  paragraph: {
    marginBottom: 16,
    lineHeight: 22,
  },
  actions: {
    justifyContent: 'center',
    paddingBottom: 16,
    flexDirection: 'column',
    alignItems: 'center',
  },
  actionButton: {
    marginTop: 8,
    width: '80%',
  },
});