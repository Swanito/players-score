import React, { ChangeEvent, FormEvent, useState, useCallback, ChangeEventHandler } from 'react';
import { FormControl, FormHelperText, Input } from '@chakra-ui/react';
import { Box, HStack, Heading, Button, FormLabel } from '@northlight/ui';

interface NewScoreFormProps {
    isLoading: boolean;
    onSubmit: (event: FormEvent<HTMLFormElement>, values: { player: string; score: number }) => void;
}

export function NewScoreForm({ isLoading, onSubmit }: NewScoreFormProps) {
    const [player, setPlayer] = useState('');
    const [score, setScore] = useState<number | ''>('');

    const handlePlayerChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setPlayer(e.target.value);
    }, []);

    const handleScoreChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        const value = parseInt(e.target.value, 10);
        setScore(isNaN(value) ? '' : value);
    }, []);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (player.trim() && typeof score === 'number' && !isNaN(score)) {
            onSubmit(event, { player, score });
        }
    };

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <HStack spacing="24px" display={"flex"} flexWrap={"wrap"}>
                    <FormControl isRequired>
                        <FormLabel htmlFor="player">Player</FormLabel>
                        <Input
                            id="player"
                            type="text"
                            value={player}
                            onChange={handlePlayerChange}
                            aria-describedby="player-helper-text"
                        />
                        <FormHelperText id="player-helper-text">Name of the player.</FormHelperText>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel htmlFor="score">Score</FormLabel>
                        <Input
                            id="score"
                            type="number"
                            value={score}
                            onChange={handleScoreChange}
                            aria-describedby="score-helper-text"
                        />
                        <FormHelperText id="score-helper-text">Score of the player.</FormHelperText>
                    </FormControl>
                    <Button
                        paddingX={10}
                        paddingY={5}
                        colorScheme="teal"
                        isLoading={isLoading}
                        type="submit"
                    >
                        Submit
                    </Button>
                </HStack>
            </form>
        </Box>
    );
}
