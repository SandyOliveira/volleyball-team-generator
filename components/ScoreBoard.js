import React from 'react';
import { View, Text, Button } from 'react-native';

const ScoreBoard = ({ team1, team2, score1, score2, onScoreChange }) => {
  return (
    <View>
      <Text>{team1} vs {team2}</Text>
      <View>
        <Text>{team1}: {score1} points</Text>
        <Button title={`Add point to ${team1}`} onPress={() => onScoreChange(1)} />
      </View>
      <View>
        <Text>{team2}: {score2} points</Text>
        <Button title={`Add point to ${team2}`} onPress={() => onScoreChange(2)} />
      </View>
    </View>
  );
};

export default ScoreBoard;
