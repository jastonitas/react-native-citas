import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Button,TouchableHighlight, Alert, ScrollView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid';

const Formulario = ({citas, setCitas, setMostrarForm}) => {

    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');

    const [paciente, setPaciente] = useState('');
    const [propietario, setPropietario] = useState('');
    const [telefono, setTelefono] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    //Date Picker
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirmDate = (date) => {
        const opciones = { year: 'numeric', month: 'long', day: "2-digit" };
        console.log(date.toLocaleDateString('es-ES', opciones));
        setFecha(date.toLocaleDateString('es-ES', opciones));
        hideDatePicker();
    };

    //Time Picker
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleConfirmTime = (time) => {
        const opciones = { hour: "numeric", minute: "2-digit" };
        console.log(time.toLocaleTimeString('en-US', opciones));
        setHora(time.toLocaleTimeString('en-US', opciones));
        hideTimePicker();
    };

    const crearNuevaCita = () => {
        console.log('creando nueva cita...');
        if (paciente.trim() === '' 
            || propietario.trim() === ''
            || telefono.trim() === ''
            || fecha.trim() === ''
            || hora.trim() === ''
            || sintomas.trim() === ''
        ) {
            mostrarAlerta();
        } else {
            const cita = {paciente, propietario, telefono, fecha, hora, sintomas};
            cita.id = shortid.generate();
            const nuevoCitas = [...citas, cita];
            setCitas(nuevoCitas);
            setMostrarForm(false);
        }
    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Todos los campos son obligatorios',
            [{
                text: 'Ok',
            }],
        );
    }

    return (
        <>
            <ScrollView style={styles.formulario}>
                <View>
                    <Text style={styles.label}>Paciente:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(texto) => setPaciente(texto)}
                        textAlign={'center'}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Propietario:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(texto) => setPropietario(texto)}
                        textAlign={'center'}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Telefono contacto:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(texto) => setTelefono(texto)}
                        textAlign={'center'}
                        keyboardType='numeric'
                    />
                </View>

                <View>
                    <Text style={styles.label}>Fecha:</Text>
                    <Button title="Seleccionar Fecha" onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirmDate}
                        onCancel={hideDatePicker}
                        locale='es_ES'
                    />
                    <Text>{fecha}</Text>
                </View>

                <View>
                    <Text style={styles.label}>Hora:</Text>
                    <Button title="Seleccionar Hora" onPress={showTimePicker} />
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={handleConfirmTime}
                        onCancel={hideTimePicker}
                        locale='es_ES'
                    />
                    <Text>{hora}</Text>
                </View>

                <View>
                    <Text style={styles.label}>Sintomas:</Text>
                    <TextInput
                        multiline
                        style={styles.input}
                        onChangeText={(texto) => setSintomas(texto)}
                        textAlign={'center'}
                    />
                </View>

                <View>
                    <TouchableHighlight style={styles.btnSubmit} onPress={() => crearNuevaCita() }>
                        <Text style={styles.textoSubmit}>Crear nueva cita</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    formulario: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    label: {
        fontWeight: "bold",
        fontSize: 18,
        marginTop: 20
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
    },
    btnSubmit: {
        padding: 10,
        backgroundColor: '#7D024E',
        marginVertical: 10,
    },
    textoSubmit: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Formulario;
