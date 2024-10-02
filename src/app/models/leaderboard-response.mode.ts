export interface LeaderboardResponse {
    status: Number;
    message: string;
    data: LeaderboardFantasyTeam[]
}

export interface LeaderboardFantasyTeam {
    weekStatus: MatchStatus,
    playerMatchPoints: PlayerMatchPoints[],
    leaderboardUser: LeaderboardUser,
    captainId: string,
    viceCaptainId: string,
    totalPoints: Number
}

export interface PlayerMatchPoints {
    playerId: string,
    playerName: string,
    playerTeam: string,
    totalPoints: Number,
    battingPoints: Number,
    bowlingPoints: Number,
    fieldingPoints: Number,
}

export interface LeaderboardUser {
    phone: string,
    username: string,
    fullName: string,
    email: string,
}

export enum MatchStatus {
    COMPLETED,
    COMING_UP,
    IN_PROGRESS,
    CANCELLED
}