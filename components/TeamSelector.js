import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet,TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const TeamSelector = ({ teams, onTeamsSelected }) => {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');

  if (!teams || teams.length === 0) {
    return <Text>Por favor adicione os times.</Text>;
  }

  const handleSelectTeams = () => {
    if (team1 && team2 && team1 !== team2) {
      onTeamsSelected(team1, team2);
    } else {
    alert('Error,Por favor, selecione 2 times diferentes.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Selecione o Time 1:</Text>
        <RNPickerSelect
          onValueChange={(value) => setTeam1(value)}
          items={teams.map((team) => ({ label: team, value: team }))}
          style={pickerSelectStyles}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Selecione o Time 2:</Text>
        <RNPickerSelect
          onValueChange={(value) => setTeam2(value)}
          items={teams.map((team) => ({ label: team, value: team }))}
          style={pickerSelectStyles}
        />
      </View>

      <View>
        <TouchableOpacity  style={styles.buttonContainer} onPress={handleSelectTeams} >
         <Text style={{fontSize:22,color:"white"}}>Iniciar Partida</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#848081',
    width: '100%',
    height:"45%"
  },
  row: {
    flexDirection: 'column',
    marginBottom: 20,
    width:"100%"
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
    fontWeight:"bold"
  },
  buttonContainer: {
    backgroundColor: 'green',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center', // Centraliza o texto do botão
    justifyContent: 'center', // Centraliza o conteúdo do botão verticalmente
    width: '100%', // Preenche toda a largura da tela
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, 
    width: '100%', 
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, 
    width: '100%', 
  },
};

export default TeamSelector;
