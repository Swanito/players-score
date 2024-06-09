import React, { FormEvent, useEffect, useReducer, useMemo } from 'react';
import { Box, useToast } from '@chakra-ui/react';
import { Container, VStack, HStack, Heading, H2 } from '@northlight/ui';
import { ExcelDropzone, ExcelRow } from '../../components/excel-dropzone';
import { RankingTable } from '../../components/ranking-table';
import { NewScoreForm } from '../../components/form';
import initialUsers from '../../data/users';
import initialScores from '../../data/scores';
import { reducer, initialState, sortUsersAndScores } from './reducer/reducer';
import { ADD_PLAYER_SCORE_ACTION, SET_LOADING_ACTION } from '../../constants/constants';

export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    users: initialUsers,
    scores: initialScores,
  });
  const toast = useToast();

  const handleSheetData = (data: ExcelRow[]) => {
    data.forEach((row) => {
      if (row) {
        dispatch({ type: 'ADD_PLAYER_SCORE', payload: { player: row.name, score: row.score } });
      }
    });
  };

  const handleNewPlayerScore = (event: FormEvent<HTMLFormElement>, values: { player: string; score: number }) => {
    event.preventDefault();
    dispatch({ type: SET_LOADING_ACTION, payload: true });

    dispatch({ type: ADD_PLAYER_SCORE_ACTION, payload: { player: values.player, score: values.score } });

    dispatch({ type: SET_LOADING_ACTION, payload: false });
    toast({
      title: 'Score added',
      description: 'Your score has been successfully stored!',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  useEffect(() => {
    const ranking = sortUsersAndScores(state.users, state.scores);
    dispatch({ type: 'SET_RANKING', payload: ranking });
  }, [state.users, state.scores]);

  const ranking = useMemo(() => state.ranking, [state.ranking]);

  return (
    <Container maxW="6xl" padding="4">
      <Heading marginBottom="4">Mediatool exercise</Heading>
      <HStack
        spacing={10}
        align="center"
        display={"flex"}
        flexWrap={"wrap"}
      >
        <ExcelDropzone onSheetDrop={handleSheetData} label="Import excel file here" />
        <VStack align="left">
          <H2 mb={8}>New score</H2>
          <NewScoreForm isLoading={state.isLoading} onSubmit={handleNewPlayerScore} />
        </VStack>
      </HStack>
      <HStack>
        <Box mt={8} width={"100vw"} >
          <RankingTable ranking={ranking} />
        </Box>
      </HStack>
    </Container >
  );
}
