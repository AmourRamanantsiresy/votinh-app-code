import { Vote, VoteAction, VoteSection } from '@/types';
import { axiosBase } from '.';

const baseUrl = process.env.BASE_URL;

const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

export class VoteProvider {
  async getOneVote(voteId: string) {
    const { data } = await axiosBase.get(`/vote/${voteId}`);
    return data;
  }

  async makeVote(voteId: string, voteActions: VoteAction[], key: string): Promise<void> {
    const { data } = await axiosBase.put(`/vote/${voteId}/makeWithKey`, voteActions, {
      params: {
        key,
      },
    });
    return data;
  }

  async getAll(name: string): Promise<Vote[]> {
    const { data } = await axiosBase.get(`/vote?name=${name}`);
    return data;
  }

  async getAllVoteSections(id: string, name: string = ''): Promise<VoteSection[]> {
    const { data } = await axiosBase.get(`/vote/${id}/voteSection`);
    return data;
  }

  async getAllVoteCandidates(voteSectionId: string): Promise<any[]> {
    const { data } = await axiosBase.get(`/voteSection/${voteSectionId}/candidate`);
    return data;
  }

  async generateKey(voteId: string) {
    const { data } = await axiosBase.get(`/otp/generate/${voteId}`);
    return data;
  }
}

export const apiProvider = new VoteProvider();

export default VoteProvider;
