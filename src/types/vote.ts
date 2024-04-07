export interface Vote {
    id: string;
    name: string;
    votersCountAllowed: number;
    createdAt: string;
  }
  
  export interface VoteAction {
    sectionId: string;
    candidateIds: string[];
  }
  
  export interface VoteResult {
    name: string;
    id: string;
    votersCount: number;
    sectionResults: VoteSectionResult[];
    createdAt: string;
  }
  
  export interface VoteSectionResult {
    name: string;
    id: string;
    voteCountAllowed: number;
    votersCount: number;
    whiteVoteCount: number;
    needSecondVote?: boolean;
    voteCandidateWinners?: VoteCandidateResult[];
    voteCandidateResults: VoteCandidateResult[];
  }
  
  export interface VoteCandidateResult {
    name: string;
    id: string;
    votes: number;
    votesInPercent: number;
    picture: string;
    lastName: string;
    firstName: string;
  }
  
  export interface VoteSection {
    id: string;
    name: string;
    voteCountAllowed: number;
    createdAt: string;
  }
  
  export interface VoteCandidate {
    id: string;
    name: string;
    lastName: string;
    firstName: string;
    picture?: string;
    voteSectionId: string;
    createdAt: string;
  }
  