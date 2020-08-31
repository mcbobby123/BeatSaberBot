import { RestClient } from "typed-rest-client/RestClient";

export const host = 'https://new.scoresaber.com';
export const apiHost = `${host}/api/`;
const restClient = new RestClient(null, apiHost);

export const getPlayer = async (id: string) => {
  const response = await restClient.get<Player>(`player/${id}/full`);

  if (response.result === null) {
    throw new Error(`Failed to fetch player ${id} (status=${response.statusCode})`);
  }

  return response.result;
}

export const getPlayers = async (page: number) => {
  const response = await restClient.get<PagifiedPlayer[]>(`players/${page}`);

  if (response.result === null) throw new Error(`Failed to fetch pagified players with page=${page} (status=${response.statusCode})`);

  return response.result;
}

export const getScores = async (id: string, order: ScoreOrderInstance, page: number = 1) => {
  const response = await restClient.get<ScoreReply>(`player/${id}/scores/${order}/${page}`);

  if (response.result === null) throw new Error(`Failed to fetch scores for ${id} (status=${response.statusCode})`);

  return response.result;
}

export const getAllScores = async (id: string) => {
  let scores: Score[] = [];
  let page = 1;

  while (true) {
    try {
      const scoreReply = await getScores(id, ScoreOrder.RECENT, page++);
      if (!scoreReply.scores.length) break;
      scores.push(...scoreReply.scores);
    } catch (e) {
      console.error(e);
    }
  }

  return { scores } as ScoreReply;
}

export const getPlayerPages = async () => {
  const response = await restClient.get<PagesReply>(`players/pages`);

  if (response.result === null) throw new Error(`Failed fetch to pages (status=${response.statusCode})`);

  return response.result;
}

export const getAvatarURL = (id: string) => `${host}static/avatars/${id}.jpg`;

export const ScoreOrder = {
  TOP: "top",
  RECENT: "recent",
} as const;

export type ScoreOrderInstance = (typeof ScoreOrder)[keyof typeof ScoreOrder];

export interface Badge {
  image: string,
  description: string,
}

export interface PlayerInfo {
  playerId: string,
  playerName: string,
  avatar: string,
  rank: number,
  countryRank: number
  pp: number,
  country: string,
  role: string,
  badges: Badge[],
  history: string,
  banned: number,
  inactive: number,
  permissions: number,
}

export interface ScoreStats {
  totalScore: number,
  totalRankedScore: number,
  averageRankedAccuracy: number,
  totalPlayCount: number,
  rankedPlayCount: number
}

export interface Player {
  playerInfo: PlayerInfo,
  scoreStats: ScoreStats
}


export interface PagifiedPlayer {
  playerid: number,
  pp: number,
  banned: number,
  inactive: number,
  name: string,
  country: string,
  role: string,
  history: string,
  rank: number,
  difference: number,
  avatar: string
}

export interface Score {
  scoreId: number,
  leaderboardId: number,
  score: number,
  uScore: number,
  mods: string,
  playerId: string,
  timeset: string,
  pp: number,
  weight: number,
  id: string,
  name: string,
  songName: string,
  songSubName: string,
  songAuthorName: string,
  levelAuthorName: string,
  difficulty: number,
  difficultyRaw: string,
  maxScore: number,
  rank: number
}

export const difficulties = [
  '?',
  'Easy',
  '?',
  'Normal',
  '?',
  'Hard',
  '?',
  'Expert',
  '?',
  'Expert+'
]

export interface ScoreReply {
  scores: Score[]
}

export interface PagesReply {
  pages: number;
}