import { RankingPosition } from '../../../components/ranking-table';

interface Score {
    userId: number;
    score: number;
}

interface User {
    _id: number;
    name: string;
}

interface State {
    isLoading: boolean;
    ranking: RankingPosition[];
    users: User[];
    scores: Score[];
}

type Action =
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'ADD_PLAYER_SCORE'; payload: { player: string; score: number } }
    | { type: 'SET_RANKING'; payload: RankingPosition[] };

const initialState: State = {
    isLoading: false,
    ranking: [],
    users: [],
    scores: [],
};

function addOrUpdateUser(users: User[], playerName: string): User[] {
    const existingUser = users.find((u) => u.name === playerName);
    if (existingUser) {
        return users;
    } else {
        const newId = users.length ? users[users.length - 1]._id + 1 : 1;
        return [...users, { _id: newId, name: playerName }];
    }
}

function createScore(users: User[], playerName: string, score: number): Score {
    const user = users.find((u) => u.name === playerName);
    if (!user) {
        throw new Error(`User not found: ${playerName}`);
    }
    return { userId: user._id, score };
}

function sortUsersAndScores(users: User[], scores: Score[]): RankingPosition[] {
    const maxScores: { [key: number]: number } = {};
    scores.forEach((score) => {
        if (!maxScores[score.userId] || score.score > maxScores[score.userId]) {
            maxScores[score.userId] = score.score;
        }
    });

    const ranking = users.map((user) => ({
        name: user.name,
        maxScore: maxScores[user._id],
        allScores: scores
            .filter((score) => score.userId === user._id)
            .map((userScore) => userScore.score)
            .sort((a, b) => b - a),
        isExpanded: false,
    }));

    return ranking.sort((a, b) => b.maxScore - a.maxScore);
}

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'ADD_PLAYER_SCORE':
            const updatedUsers = addOrUpdateUser(state.users, action.payload.player);
            const newScore = createScore(updatedUsers, action.payload.player, action.payload.score);
            const updatedScores = [...state.scores, newScore];
            const updatedRanking = sortUsersAndScores(updatedUsers, updatedScores);
            return { ...state, users: updatedUsers, scores: updatedScores, ranking: updatedRanking };
        case 'SET_RANKING':
            return { ...state, ranking: action.payload };
        default:
            return state;
    }
}

export { reducer, sortUsersAndScores, initialState, State, Action, Score, User };
