import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';


const Match = ({ teams, onScoreUpdate }) => {
  const [points1, setPoints1] = useState(0);
  const [points2, setPoints2] = useState(0);
  useEffect(() => {
    const unlockOrientation = async () => {
      await ScreenOrientation.unlockAsync();
    };
  
    unlockOrientation();
  
    return async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
  }, []);

  const handlePointAdd = (team) => {
    if (team === 1) {
      setPoints1((prev) => {
        const newPoints = prev + 1;
        onScoreUpdate(newPoints, points2);
        return newPoints;
      });
    } else {
      setPoints2((prev) => {
        const newPoints = prev + 1;
        onScoreUpdate(points1, newPoints);
        return newPoints;
      });
    }
  };

  const handlePointRemove = (team) => {
    if (team === 1 && points1 > 0) {
      setPoints1((prev) => {
        const newPoints = prev - 1;
        onScoreUpdate(newPoints, points2);
        return newPoints;
      });
    } else if (team === 2 && points2 > 0) {
      setPoints2((prev) => {
        const newPoints = prev - 1;
        onScoreUpdate(points1, newPoints);
        return newPoints;
      });
    }
  };

  return (
    <View style={styles.container1}>
      <View style={styles.container2}>
        <Text style={styles.title1}>{teams[0]}</Text>
        <Text style={styles.title2}>X</Text>
        <Text style={styles.title3}>{teams[1]}</Text>
      </View>
      <View style={styles.container3}>
        <View style={styles.buttonsContainer}>
          {/* Botão vermelho */}
          <View style={styles.teamContainer}>
            <TouchableOpacity
              style={[styles.button, styles.redButton]}
              onPress={() => handlePointAdd(1)}
            >
              <Text style={styles.buttonText}>{points1}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handlePointRemove(1)}
            >
              <MaterialIcons name="arrow-drop-down" size={25} color="white" />
            </TouchableOpacity>
          </View>

          {/* Botão azul */}
          <View style={styles.teamContainer}>
            <TouchableOpacity
              style={[styles.button, styles.blueButton]}
              onPress={() => handlePointAdd(2)}
            >
              <Text style={styles.buttonText}>{points2}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handlePointRemove(2)}
            >
              <MaterialIcons name="arrow-drop-down" size={25} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    width: '100%',
    height: '100%',
    color: '#fff'
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    height: '10%',
    backgroundColor: '#555',
    textAlignVertical: 'center',
    color: '#fff'
  },
  container3: {
    flexDirection: 'row',
    width: '100%',
    height: '90%'
  },
  title1: {
    fontSize: 25,
    fontWeight: 'bold',
    minWidth: '40%',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
  },
  title2: {
    fontSize: 15,
    fontWeight: 'bold',
    minWidth: '20%',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
  },
  title3: {
    fontSize: 25,
    fontWeight: 'bold',
    minWidth: '40%',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    padding: 1,
  },
  teamContainer: {
    flex: 1,
  },
  button: {
    width: '100%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  redButton: {
    backgroundColor: 'red',
  },
  blueButton: {
    backgroundColor: 'blue',
  },
  buttonText: {
    color: 'white',
    fontSize: 150,
  },
  removeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#555',
    borderRadius: 0,
    padding: 10,
    width: '100%',
  },
});

export default Match;
