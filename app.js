import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, Vibration} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Accelerometer } from 'expo-sensors';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();




const exercicios = [
  { 
    id: '1', 
    titulo: 'Flexão', 
    image: 'https://www.feitodeiridium.com.br/wp-content/uploads/2016/08/Exercicios-Peitoral-flexao-com-peso.jpg',
    descricao: 'A flexão é um exercício de força que trabalha o peitoral, tríceps e ombros. É ideal para fortalecer a parte superior do corpo.'
  },
  { 
    id: '2', 
    titulo: 'Abdominal', 
    image: 'https://blog.ciaathletica.com.br/wp-content/uploads/2021/01/abdominal.jpg',
    descricao: 'Os abdominais são exercícios focados nos músculos do core, ajudando a melhorar a estabilidade e força abdominal.'
  },
  { 
    id: '3', 
    titulo: 'Agachamento', 
    image: 'https://gustavomartinspersonal.com.br/wp-content/uploads/2020/03/WhatsApp-Image-2020-03-02-at-15.44.13-2.jpeg',
    descricao: 'O agachamento é um exercício fundamental que trabalha as pernas e glúteos, essencial para a força na parte inferior do corpo.'
  },
  { 
    id: '4', 
    titulo: 'Corrida', 
    image: 'https://runnersworld.com.br/wp-content/uploads/sites/4/2016/08/em-busca-da-corrida-perfeita.jpg',
    descricao: 'A corrida é uma atividade cardiovascular excelente que melhora a resistência, queima calorias e fortalece as pernas.'
  },
  { 
    id: '5', 
    titulo: 'Polichinelo', 
    image: 'https://blogeducacaofisica.com.br/wp-content/uploads/2022/05/polichinelo.jpeg',
    descricao: 'O polichinelo é um exercício aeróbico que aumenta a frequência cardíaca e ajuda a melhorar a agilidade e coordenação.'
  },
  { 
    id: '6', 
    titulo: 'Prancha', 
    image: 'https://www.hipertrofia.org/blog/wp-content/uploads/2019/02/prancha-musculos-envolvidos.jpg',
    descricao: 'A prancha é um exercício isométrico que fortalece o core e melhora a postura, sendo muito eficiente para o abdômen.'
  },
  { 
    id: '7', 
    titulo: 'Bicicleta', 
    image: 'https://static.tuasaude.com/media/article/da/db/beneficios-da-bicicleta-ergometrica_22527_l.jpg',
    descricao: 'A bicicleta ergométrica é um ótimo exercício cardiovascular que fortalece as pernas e melhora a resistência física.'
  },
];

function Header({ title, navigation }) {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.drawerIcon}>
        <MaterialCommunityIcons name="menu" size={26} color="white" />
      </TouchableOpacity>
      <Text style={styles.headertitulo}>{title}</Text>
      <TouchableOpacity onPress={() => navigation.replace('Login')} style={styles.loginButton}>
        <MaterialCommunityIcons name="login" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const storedPassword = await AsyncStorage.getItem(username);
    if (storedPassword && storedPassword === password) {
      navigation.replace('Home');
    } else {
      Vibration.vibrate(1000);
      alert('Usuário ou senha incorretos!');
    }
  };

  return (
    <View style={styles.containerini}>
      <Text style={styles.titulo}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        placeholderTextColor="#ddd"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#ddd"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

function CadastroScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleCadastro = async () => {
    await AsyncStorage.setItem(username, password);
    alert('Usuário cadastrado com sucesso!');
  };

  return (
    <View style={styles.containerini}>
      <Text style={styles.titulo}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        placeholderTextColor="#ddd"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#ddd"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header title="FitLife App" navigation={navigation} />
      <ScrollView contentContainerStyle={styles.homeContentContainer}>
        <Image
          source={{ uri: 'https://ironberg.com.br/assets/images/ironberg-sp-3.jpeg' }}
          style={styles.image}
        />
        <View style={styles.aboutContainer}>
          <Text style={styles.aboutText}>
            Bem-vindo ao FitLife App! Aqui você pode acompanhar seu progresso em vários exercícios
            físicos, registrar suas atividades e ver seu avanço ao longo do tempo.
          </Text>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('MontarTreino')}
          >
            <Text style={styles.buttonText}>Montar Treino</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('VisualizarTreino')}
          >
            <Text style={styles.buttonText}>Visualizar Treino</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Detalhes_exercicios({ route, navigation }) {
  const { titulo } = route.params;

  const exercicio = exercicios.find((ex) => ex.titulo === titulo);

  return (
    <SafeAreaView style={styles.safeContainer}>
    <View style={styles.container}>
      <Header title={titulo} navigation={navigation} />
      <Text style={styles.subtitulo}>Sobre o Exercício</Text>
      {exercicio && (
        <>
          <Image source={{ uri: exercicio.image }} style={styles.image} />
          <View style={styles.descricaoContainer}>
            <Text style={styles.descricao}>{exercicio.descricao}</Text>
          </View>
        </>
      )}
    </View>
    </SafeAreaView>
  );
}


function MontarTreino({ navigation }) {
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [reps, setReps] = useState({}); 

  const toggleExercise = (exerciseId) => {
    if (selectedExercises.includes(exerciseId)) {
      setSelectedExercises(selectedExercises.filter(id => id !== exerciseId));
      const newReps = { ...reps };
      delete newReps[exerciseId];
      setReps(newReps);
    } else {
      setSelectedExercises([...selectedExercises, exerciseId]);
      setReps({ ...reps, [exerciseId]: 0 });
    }
  };

  const handleRepChange = (exerciseId, increment) => {
    setReps((prev) => {
      const newReps = { ...prev };
      if (newReps[exerciseId] !== undefined) {
        newReps[exerciseId] += increment;
      } else {
        newReps[exerciseId] = increment;
      }
      return newReps;
    });
  };

  const handleSaveTreino = async () => {
    await AsyncStorage.setItem('selectedExercises', JSON.stringify(selectedExercises));
    await AsyncStorage.setItem('exerciseReps', JSON.stringify(reps)); 
    alert('Treino salvo com sucesso!');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
    <View style={styles.container}>
      <Header title="Montar Treino" navigation={navigation} />
      <ScrollView contentContainerStyle={styles.homeContentContainer}>
        {exercicios.map((exercise) => (
          <View key={exercise.id}>
            <TouchableOpacity
              style={[styles.exerciseItem, selectedExercises.includes(exercise.id) && styles.selected]}
              onPress={() => toggleExercise(exercise.id)}
            >
              <Text style={styles.exerciseText}>{exercise.titulo}</Text>
            </TouchableOpacity>
            {selectedExercises.includes(exercise.id) && (
              <View style={styles.repContainer}>
                <TouchableOpacity onPress={() => handleRepChange(exercise.id, 1)}>
                  <Text style={styles.buttonrep}>+1 Repetição</Text>
                </TouchableOpacity>
                <Text style={styles.progressText}>Repetições: {reps[exercise.id] || 0}</Text>
              </View>
            )}
          </View>
        ))}
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleSaveTreino}
        >
          <Text style={styles.buttonText}>Salvar Treino</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
    </SafeAreaView>

  );
}



function VisualizarTreino({ navigation }) {
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [exerciseReps, setExerciseReps] = useState({});

  useEffect(() => {
    const loadSelectedExercises = async () => {
      const storedExercises = await AsyncStorage.getItem('selectedExercises');
      const storedReps = await AsyncStorage.getItem('exerciseReps');

      if (storedExercises) {
        setSelectedExercises(JSON.parse(storedExercises));
      }

      if (storedReps) {
        setExerciseReps(JSON.parse(storedReps));
      }
    };

    loadSelectedExercises();
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
    <View style={styles.container}>
      <Header style ={styles.header1} title="Meu Treino" navigation={navigation} />
      <ScrollView contentContainerStyle={styles.homeContentContainer}>
        {selectedExercises.map((exerciseId) => {
          const exercise = exercicios.find((ex) => ex.id === exerciseId);
          const reps = exerciseReps[exerciseId] || 0; 
          return (
            <View key={exerciseId} style={styles.exerciseItem}>
              <Text style={styles.exerciseText}>{exercise.titulo}</Text>
              <Text style={styles.progressText}>Repetições: {reps}</Text> 
            </View>
          );
        })}
        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
    </SafeAreaView>
  );
}


const PularScreeen = ({ navigation }) => {
  const [stepsCount, setStepsCount] = useState(0);
  const [lastZ, setLastZ] = useState(0);
  const [lastStepTime, setLastStepTime] = useState(0); 

  const selectedExercises = [1, 2, 3];

  useEffect(() => {
   
    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      const threshold = 1.5; 
      const currentTime = Date.now();
      const timeThreshold = 500; 

      if (Math.abs(z - lastZ) > threshold && (currentTime - lastStepTime) > timeThreshold) {
        setStepsCount(prevCount => prevCount + 1); 
        setLastStepTime(currentTime); 
      }

      setLastZ(z);
    });

    
    return () => subscription.remove();
  }, [lastZ, lastStepTime]); 

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Header style={styles.header1} title="Contagem de Pulos" navigation={navigation} />
        <ScrollView contentContainerStyle={styles.homeContentContainer}>
          {selectedExercises.map((exerciseId) => {
            return (
              <View key={exerciseId} style={styles.exerciseItem}>
                <Text style={styles.exerciseText}>Passos detectados: {stepsCount}</Text>
              </View>
            );
          })}
          <TouchableOpacity 
            style={styles.button}  
            onPress={() => setStepsCount(0)} 
          >
            <Text style={styles.buttonText}>Resetar Contagem</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerStyle: styles.drawerContent,
        drawerActiveTintColor: '#0D47A1',
        drawerInactiveTintColor: 'whitesmoke',
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Pular" component={PularScreeen} />
      {exercicios.map((exercise) => (
        <Drawer.Screen
          key={exercise.id}
          name={exercise.titulo}
          component={Detalhes_exercicios}
          initialParams={{ titulo: exercise.titulo }}
        />
      ))}
    </Drawer.Navigator>
  );
}

function DrawerNavigatorpula() {
  return (
    <Drawer.Navigator
      initialRouteName="Running"
      screenOptions={{
        headerShown: false,
        drawerStyle: styles.drawerContent,
        drawerActiveTintColor: '#0D47A1',
        drawerInactiveTintColor: 'whitesmoke',
      }}
    >
      <Drawer.Screen name="Pular" component={PularScreeen} />
      {exercicios.map((exercise) => (
        <Drawer.Screen
          key={exercise.id}
          name={exercise.titulo}
          component={Detalhes_exercicios}
          initialParams={{ titulo: exercise.titulo }}
        />
      ))}
    </Drawer.Navigator>
  );
}


function DrawerNavigatorMont() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerStyle: styles.drawerContent,
        drawerActiveTintColor: '#0D47A1',
        drawerInactiveTintColor: 'whitesmoke',
      }}
    >
      <Drawer.Screen name="MontarTreino" component={MontarTreino} />
      {exercicios.map((exercise) => (
        <Drawer.Screen
          key={exercise.id}
          name={exercise.titulo}
          component={Detalhes_exercicios}
          initialParams={{ titulo: exercise.titulo }}
        />
      ))}
    </Drawer.Navigator>
  );
}

function DrawerNavigatorVisu() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerStyle: styles.drawerContent,
        drawerActiveTintColor: '#0D47A1',
        drawerInactiveTintColor: 'whitesmoke',
      }}
    >
      <Drawer.Screen name="VisualizarTreino" component={VisualizarTreino} />
      {exercicios.map((exercise) => (
        <Drawer.Screen
          key={exercise.id}
          name={exercise.titulo}
          component={Detalhes_exercicios}
          initialParams={{ titulo: exercise.titulo }}
        />
      ))}
    </Drawer.Navigator>
  );
}



function LoginStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={DrawerNavigator} />
      <Stack.Screen name="MontarTreino" component={DrawerNavigatorMont} />
      <Stack.Screen name="VisualizarTreino" component={DrawerNavigatorVisu} />
      <Stack.Screen name="DrawerNavigatorpula" component={DrawerNavigatorpula} />
    </Stack.Navigator>
  );
}




export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="LoginStack"
          component={LoginStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
            title: 'Acessar',
          }}
        />
        <Tab.Screen
          name="Cadastro"
          component={CadastroScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-plus" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0D47A1',
    padding: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0D47A1',
    padding: 16,
  },
  drawerIcon: {
    padding: 10,
  },
  headertitulo: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  loginButton: {
    padding: 10,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'whitesmoke',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'whitesmoke',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#fff',
    marginBottom: 15,
    backgroundColor: '#121212',
    width: '90%',
    alignSelf: 'center', 
  },
    button: {
    backgroundColor: '#0D47A1',
    paddingVertical: 18,
    paddingHorizontal: 35, 
    borderRadius: 10, 
    alignItems: 'center',
    marginTop: 12,
    width: '90%',
    alignSelf: 'center',
  },
   descricaoContainer: {
    padding: 20,
    backgroundColor: '#1A1A1A',
    shadowColor: '#000',
    borderRadius: 12, 
    marginTop: 15, 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, 
    shadowRadius: 10, 
    elevation: 5, 
  },
  descricao: {
    fontSize: 16,
    color: 'whitesmoke',
    lineHeight: 22,
    textAlign: 'justify',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20, 
    fontWeight: 'bold',
  },

  buttonrep: {
    backgroundColor: 'whitesmoke',
    paddingVertical: 10,
    paddingHorizontal: 10, 
    borderRadius: 30, 
    marginTop: 12,
    alignItems: "center",
    width: '30%',
    alignSelf: 'center',
    color: '#black',
    fontSize: 10, 
    fontWeight: 'bold',
  },

  homeContentContainer: {
    flexGrow: 1,
    paddingHorizontal: 0, 
    paddingVertical: 0, 
    backgroundColor: '#000000',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 20,
  },
  aboutContainer: {
    padding: 16,
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  aboutText: {
    fontSize: 16,
    color: 'whitesmoke',
    lineHeight: 22,
    textAlign: 'justify',
  },
  exerciseItem: {
    padding: 20,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    marginBottom: 15, 
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#0D47A1',
  },
  exerciseText: {
    fontSize: 16,
    color: '#fff',
  },
  progressText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  safeContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  drawerContent: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    paddingTop: 20,
  },
   containerini: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: "center",
    textAlign: "center",
  },
});