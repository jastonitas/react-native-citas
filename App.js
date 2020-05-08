import React, { useState } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableHighlight, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Cita from './componentes/Cita';
import Formulario from './componentes/Formulario';

const App = () => {

  const [citas, setCitas] = useState([]);

  const eliminarPaciente = id => {
    setCitas( (citasActuales) => {
      return citasActuales.filter( cita => cita.id != id )
    } )
    console.log('paciente: ' + id + ' eliminado.');
  };

  const [mostrarForm, setMostrarForm] = useState(false);

  const cerrarTeclado = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
    <View style={styles.container}>
      <Text style={styles.title}>Administardor de Citas</Text>
      <TouchableHighlight style={styles.btnMostrarFormulario} onPress={() => setMostrarForm(!mostrarForm) }>
        <Text style={styles.textoMostrarFormulario}>{mostrarForm? 'Crear nueva cita': 'Cancelar nueva cita'}</Text>
      </TouchableHighlight>
      <View style={styles.contenido}>
        {mostrarForm? (
          <Formulario
            citas={citas}
            setCitas={setCitas}
            setMostrarForm={setMostrarForm}>
          </Formulario>
        ): (
          <>
            <Text style={styles.title}> {citas.length > 0? 'Administra tus citas': 'No hay citas'}</Text>
            <FlatList
              style={styles.listado}
              data={citas}
              renderItem={ ({item}) => <Cita cita={item} eliminarPaciente={eliminarPaciente}/> }
              keyExtractor={ cita => cita.id }
            />
          </>
        )
        }
      </View>
    </View>
  </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%',

  },
  listado: {
    flex: 1
  },
  container: {
    backgroundColor: '#AA076B',
    flex: 1,
  },
  title: {
    marginTop: Platform.OS === 'ios'? 40: 20,
    marginBottom: 20,
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: "center"
  },
  btnMostrarFormulario: {
    padding: 10,
    backgroundColor: '#7D024E',
    marginVertical: 10,
  },
  textoMostrarFormulario: {
      color: '#FFF',
      fontWeight: 'bold',
      textAlign: 'center',
  },
});

export default App;
