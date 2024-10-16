import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const MatchHistory = ({ matches }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Partidas</Text>
      <FlatList
        data={[...matches].reverse()}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.matchText}>
            {item.teams[0]} vs {item.teams[1]} - Vencedor: {item.winner}
          </Text>
        )}
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'flex-start', 
    padding: 20,
    backgroundColor: '#848081', 
  },
  title: {
    fontSize: 24, 
    fontWeight: 'bold',
    marginBottom: 10,
  },
  matchText: {
    fontSize: 16,
    marginVertical: 5,
    padding: 10, 
    backgroundColor: '#fff',
    borderRadius: 5, 
    elevation: 1,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1, 
  },
});

export default MatchHistory;
