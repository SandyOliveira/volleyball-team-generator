import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, StatusBar, Platform } from 'react-native';
import TeamInput from './components/TeamInput';
import TeamSelector from './components/TeamSelector';
import Match from './components/Match';
import MatchHistory from './components/MatchHistory';

const App = () => {
  const [teams, setTeams] = useState([]);
  const [currentMatch, setCurrentMatch] = useState([]);
  const [matchesHistory, setMatchesHistory] = useState([]);
  const [winners, setWinners] = useState([]);
  const [losers, setLosers] = useState([]);
  const [matchCount, setMatchCount] = useState(0);
  const [points1, setPoints1] = useState(0); // Para controlar os pontos do time 1
  const [points2, setPoints2] = useState(0); // Para controlar os pontos do time 2

  const handleTeamsSubmit = (newTeams) => {
    if (newTeams.length >= 4) {
      setTeams(newTeams);
    } else {
      alert('Atenção, por favor, insira pelo menos 4 times.');
    }
  };

  const handleTeamsSelected = (team1, team2) => {
    if (team1 && team2) {
      setCurrentMatch([team1, team2]);
      setPoints1(0); // Reinicia os pontos ao iniciar uma nova partida
      setPoints2(0); // Reinicia os pontos ao iniciar uma nova partida
      startMatch();
    } else {
      alert('Atenção, por favor, selecione dois times válidos.');
    }
  };

  const startMatch = () => {
    if (currentMatch.length > 0) {
      setCurrentMatch(currentMatch);
    }
  };

  const onMatchEnd = (winner) => {
    const loser = currentMatch.find((team) => team !== winner);

    // Adiciona o vencedor e o perdedor nas listas
    setWinners((prevWinners) => [...prevWinners, winner]);
    setLosers((prevLosers) => [...prevLosers, loser]);

    // Registra a partida no histórico
    const matchDetails = {
      teams: currentMatch,
      winner,
    };
    setMatchesHistory((prevHistory) => [...prevHistory, matchDetails]);

    // Reinicia a partida e pontuação
    setCurrentMatch([]);
    setMatchCount((prevCount) => prevCount + 1);
    startNextMatch();
  };

  const startNextMatch = () => {
    if (matchCount === 0) {
      // 3° jogo: Vencedor da 1ª partida vs Vencedor da 2ª partida
      if (winners.length === 2) {
        setCurrentMatch([winners[winners.length - 2], winners[winners.length - 1]]);
        return;
      }
    } else if (matchCount === 1) {
      // 4° jogo: Perdedor da 1ª partida vs Perdedor da 2ª partida
      if (losers.length >= 2) {
        setCurrentMatch([losers[losers.length - 2], losers[losers.length - 1]]);
        return;
      }
    } else if (matchCount === 2) {
      // 5° jogo: Vencedor da 3ª partida vs Perdedor da 2ª partida
      if (winners.length >= 3 && losers.length >= 1) {
        setCurrentMatch([winners[winners.length - 1], losers[losers.length - 1]]);
        return;
      }
    } else if (matchCount === 3) {
      // 6° jogo: Perdedor da 1ª partida vs Perdedor da 3ª partida
      if (losers.length >= 3) {
        setCurrentMatch([losers[losers.length - 2], losers[losers.length - 1]]);
        return;
      }
    } else {
      // Reinicia o ciclo, permitindo que novos times sejam escolhidos
     alert('Atenção, Todas as partidas foram concluídas! Você pode reiniciar.');
      setWinners([]);
      setLosers([]);
      setMatchCount(0);
      setCurrentMatch([]);
      return;
    }
  };

  const handleScoreUpdate = (points1, points2) => {
    // Atualiza os pontos
    setPoints1(points1);
    setPoints2(points2);

    // Verifica se um time ganhou
    if ((points1 >= 15 && points1 - points2 >= 2) || (points2 >= 15 && points2 - points1 >= 2)) {
      const winner = points1 > points2 ? currentMatch[0] : currentMatch[1];
      onMatchEnd(winner);
    }
  };

  return (
    <View style={styles.container1}>
      {teams.length === 0 ? (
        <TeamInput onTeamsSubmit={handleTeamsSubmit} />
      ) : currentMatch.length > 0 ? (
        <Match teams={currentMatch} onScoreUpdate={handleScoreUpdate} />
      ) : (
        <>
          <Text style={{ padding: 25, fontSize: 22, fontWeight: 'bold' }}>Escolha os times para a partida:</Text>
          <TeamSelector teams={teams} onTeamsSelected={handleTeamsSelected} />
          <MatchHistory matches={matchesHistory} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    flexWrap: 'wrap',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#848081',
  },
});

export default App;
