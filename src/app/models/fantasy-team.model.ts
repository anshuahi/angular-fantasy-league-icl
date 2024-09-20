import { User } from "./user.model";

export interface FantasyTeam {
    fantasyTeamId: string,
    playerIds: string[],
    createTimestamp: string,
    captainId: string,
    viceCaptionId: string,
    userId: string,
    weekId: string,
    totalPoints: number,
}

export interface FantasyTeamResponse {
    status: number,
    message: string,
    fantasyTeam: FantasyTeam,
    usr: User
}