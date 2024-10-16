import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  StatusBar,
  Platform,
  Button,
  TouchableOpacity,
} from 'react-native';
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
  const [nextMatch, setNextMatch] = useState('');

  const handleTeamsSubmit = (newTeams) => {
    if (newTeams.length >= 2) {
      setTeams(newTeams);
      setMatchCount(0); // Reinicia a contagem de partidas
      setWinners([]); // Limpa os vencedores anteriores
      setLosers([]); // Limpa os perdedores anteriores
    } else {
      alert('Por favor, insira pelo menos 3 times para iniciar o torneio.');
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
    if (nextMatch) {
      const [team1, team2] = nextMatch.split(' vs ');
      setCurrentMatch([team1, team2]);
      setNextMatch(''); // Limpa o próximo jogo
      setPoints1(0);
      setPoints2(0);
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
  };

  useEffect(() => {
    if (matchCount >= 2 && winners.length > 0 && losers.length > 0) {
      prepareNextMatch();
    }
  }, [matchCount, winners, losers]);

  const prepareNextMatch = () => {
    let nextMatchTeams = '';

    if (teams.length === 3) {
      // Lógica para 3 times
      if (matchCount === 1) {
        // 1° jogo: Time 1 vs Time 2
        nextMatchTeams = `${teams[0]} vs ${teams[1]}`;
      } else if (matchCount === 2) {
        // 2° jogo: Time 2 vs Time 3
        nextMatchTeams = `${teams[1]} vs ${teams[2]}`;
      } else if (matchCount === 3) {
        // 3° jogo: Time 1 vs Time 3
        nextMatchTeams = `${teams[0]} vs ${teams[2]}`;
      }
    } else if (teams.length === 4) {
      // Lógica para 4 times
      if (matchCount === 2) {
        // 3° jogo: Vencedor da 1ª partida vs Vencedor da 2ª partida
        if (winners.length >= 2) {
          nextMatchTeams = `${winners[0]} vs ${winners[1]}`;
        }
      } else if (matchCount === 3) {
        // 4° jogo: Perdedor da 1ª partida vs Perdedor da 2ª partida
        if (losers.length >= 2) {
          nextMatchTeams = `${losers[0]} vs ${losers[1]}`;
        }
      } else if (matchCount === 4) {
        // 5° jogo: Vencedor da 3ª partida vs Perdedor da 2ª partida
        if (winners.length >= 3 && losers.length >= 2) {
          nextMatchTeams = `${winners[2]} vs ${losers[1]}`;
        }

      } else {
        // Reinicia o torneio quando todas as partidas forem jogadas
        alert(
          'Atenção, todas as partidas foram concluídas! Você pode reiniciar.'
        );
        resetTournament();
        return;
      }
    } else {
      // Reinicia o torneio quando todas as partidas forem jogadas
      alert(
        'Atenção, todas as partidas foram concluídas! Você pode reiniciar.'
      );
      resetTournament();
      return;

    }

    if (nextMatchTeams) {
      setNextMatch(nextMatchTeams);
    }
  };

  const resetTournament = () => {
    setWinners([]);
    setLosers([]);
    setMatchCount(0);
    setCurrentMatch([]);
  };

  const handleScoreUpdate = (points1, points2) => {
    // Atualiza os pontos
    setPoints1(points1);
    setPoints2(points2);

    // Verifica se um time ganhou
    if (
      (points1 >= 15 && points1 - points2 >= 2) ||
      (points2 >= 15 && points2 - points1 >= 2)
    ) {
      const winner = points1 > points2 ? currentMatch[0] : currentMatch[1];
      alert("A partida acabou!")
      setTimeout(() => {
        onMatchEnd(winner);
      }, 1000);
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
          <Text style={{ padding: 25, fontSize: 22, fontWeight: 'bold' }}>
            Escolha os times para a partida:
          </Text>
          <TeamSelector teams={teams} onTeamsSelected={handleTeamsSelected} />
          <MatchHistory matches={matchesHistory} />
          {nextMatch && (
            <TouchableOpacity
              style={styles.nextMatchContainer}
              onPress={startMatch}>
              <Text style={styles.nextMatchText}>
                Iniciar Próxima Partida: {nextMatch}
              </Text>
            </TouchableOpacity>
          )}
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
  nextMatchContainer: {
    backgroundColor: '#008D8C',
    borderRadius: 5,
    alignItems: 'center',
    height: 50,
  },
  nextMatchText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;
