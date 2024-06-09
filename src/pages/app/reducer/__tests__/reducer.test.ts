import { ADD_PLAYER_SCORE_ACTION, SET_LOADING_ACTION, SET_RANKING_ACTION } from '../../../../constants/constants';
import { reducer, initialState, Action, State } from '../reducer';

describe('reducer', () => {
    it('should handle SET_LOADING', () => {
        const action: Action = { type: SET_LOADING_ACTION, payload: true };
        const newState = reducer(initialState, action);
        expect(newState.isLoading).toBe(true);
    });

    it('should handle ADD_PLAYER_SCORE for existing player', () => {
        const state: State = {
            ...initialState,
            users: [{ _id: 1, name: 'Player1' }],
            scores: [],
        };
        const action: Action = { type: 'ADD_PLAYER_SCORE', payload: { player: 'Player1', score: 100 } };
        const newState = reducer(state, action);
        expect(newState.scores).toEqual([{ userId: 1, score: 100 }]);
    });

    it('should handle ADD_PLAYER_SCORE for new player', () => {
        const state: State = {
            ...initialState,
            users: [{ _id: 1, name: 'Player1' }],
            scores: [],
        };
        const action: Action = { type: ADD_PLAYER_SCORE_ACTION, payload: { player: 'Player2', score: 100 } };
        const newState = reducer(state, action);
        expect(newState.users).toEqual([
            { _id: 1, name: 'Player1' },
            { _id: 2, name: 'Player2' },
        ]);
        expect(newState.scores).toEqual([{ userId: 2, score: 100 }]);
    });

    it('should handle SET_RANKING', () => {
        const action: Action = { type: SET_RANKING_ACTION, payload: [{ name: 'Player1', maxScore: 100, allScores: [100], isExpanded: false }] };
        const newState = reducer(initialState, action);
        expect(newState.ranking).toEqual([{ name: 'Player1', maxScore: 100, allScores: [100], isExpanded: false }]);
    });
});
