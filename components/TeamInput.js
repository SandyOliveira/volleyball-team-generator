import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TeamInput = ({ onTeamsSubmit }) => {
  const [teams, setTeams] = useState(['']);

  const handleInputChange = (index, value) => {
    const newTeams = [...teams];
    newTeams[index] = value;
    setTeams(newTeams);
  };

  const handleAddTeam = () => {
    setTeams([...teams, '']);
  };

  const handleRemoveTeam = (index) => {
    const newTeams = teams.filter((_, i) => i !== index);
    setTeams(newTeams);
  };

  const handleSubmit = () => {
    const filteredTeams = teams.filter((team) => team.trim() !== ''); // Filtra times vazios
    if (filteredTeams.length >= 2) {
      onTeamsSubmit(filteredTeams);
    } else {
      alert('Por favor adicione pelo menos 2 times');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#848081' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Text
          style={{
            fontSize: 22,
            padding: 20,
            textAlign: 'center',
            color: 'white',
            fontWeight: 'bold',
          }}>
          Registrar Times
        </Text>
      </View>

      <View style={{ padding: 20 }}>
        {teams.map((team, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <TextInput
              value={team}
              onChangeText={(value) => handleInputChange(index, value)}
              placeholder={`Team ${index + 1}`}
              style={styles.input}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleRemoveTeam(index)}>
              <Icon name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        <Button title="Adicionar Time" onPress={handleAddTeam} />
      </View>

      <View style={styles.btn}>
        <TouchableOpacity style={styles.timeBtn} onPress={handleSubmit}>
          <Text style={{ fontSize: 25, textAlign: 'center', color: 'white' }}>
            Registrar Times
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 35,
    margin: 5,
    borderWidth: 1,
    padding: 10,
    width: '85%',
    backgroundColor: '#CFCFCF',
  },
  btn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
  timeBtn: {
    backgroundColor: 'green',
    height: 42,
    justifyContent: 'center',
  },
    button: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TeamInput;
