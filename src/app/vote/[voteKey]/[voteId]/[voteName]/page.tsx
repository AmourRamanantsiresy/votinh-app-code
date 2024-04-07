'use client';

import { VoteSection, VoteAction } from '@/types';
import { VoteProvider } from '@/utils';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { RiLogoutBoxRLine } from 'react-icons/ri';

const voteProvider = new VoteProvider();

function ElectionDetail() {
  const { push: navigate } = useRouter();
  const { voteId, voteName, voteKey } = useParams();

  const [allSections, setAllSections] = useState<VoteSection[]>([]);
  const [sectionCandidates, setSectionCandidates] = useState<{
    [key: string]: any[];
  }>({});
  const [clickedCandidates, setClickedCandidates] = useState<{
    [key: string]: string[];
  }>({});

  useEffect(() => {
    getAllSections();
  }, [voteId]);

  const getAllSections = async () => {
    try {
      if (typeof voteId === 'string') {
        const sections: VoteSection[] = await voteProvider.getAllVoteSections(voteId);
        setAllSections(sections);
        console.log(sections);
        sections.forEach(section => {
          getAllCandidatesForSection(section.id);
        });
      } else {
        console.error('ID is undefined');
      }
    } catch (error) {
      console.error('Error when getting sections:', error);
    }
  };

  const getAllCandidatesForSection = async (sectionId: string) => {
    try {
      const candidates = await voteProvider.getAllVoteCandidates(sectionId);
      setSectionCandidates(prevState => ({
        ...prevState,
        [sectionId]: candidates,
      }));
    } catch (error) {
      console.error('Error when getting candidates:', error);
    }
  };

  const handleExit = () => {
    navigate('/election');
  };

  const handleRefresh = () => {
    handleRecordVotes();
    alert('Misaotra anao nifidy !');
    window.location.reload();
  };

  const handleRecordVotes = async () => {
    try {
      const voteActions: VoteAction[] = Object.keys(clickedCandidates).map(sectionId => {
        const section = allSections.find(section => section.id === sectionId);
        const candidateIds = clickedCandidates[sectionId];

        // Verify if vote count exceeds the allowed limit
        if (section && candidateIds.length > section.voteCountAllowed) {
          throw new Error(`Vote count exceeds allowed limit for section ${section.name}`);
        }

        return {
          sectionId,
          candidateIds,
        };
      });

      if (typeof voteId === 'string') {
        await voteProvider.makeVote(voteId, voteActions, voteKey as string);
        console.log('Votes successfully recorded');
      }
    } catch (error) {
      console.error('Error when recording votes:', error);
    }
  };

  const handleCandidateVote = async (sectionId: string, candidateId: string) => {
    try {
      const updatedClickedCandidates = { ...clickedCandidates };
      const section = allSections.find(section => section.id === sectionId);

      //ato tsika mjery oe misy ve sa tss le section
      if (!section) {
        console.error('Section not found');
        return;
      }

      // ato mverifie oe miotra ve le selectioné
      if (updatedClickedCandidates[sectionId]?.length === section.voteCountAllowed && !updatedClickedCandidates[sectionId]?.includes(candidateId)) {
        alert(`Efa miotra ny olona nofidinao`);
        return;
      }

      // Vérifier si le candidat est déjà sélectionné
      if (updatedClickedCandidates[sectionId]?.includes(candidateId)) {
        updatedClickedCandidates[sectionId] = updatedClickedCandidates[sectionId].filter(id => id !== candidateId);
      } else {
        updatedClickedCandidates[sectionId] = [...(updatedClickedCandidates[sectionId] || []), candidateId];
      }

      setClickedCandidates(updatedClickedCandidates);
    } catch (error) {
      console.error('Error when making vote:', error);
    }
  };

  return (
    <div className='bg-gray-100 min-h-screen pb-4'>
      <nav className='flex justify-between items-center bg-white-200 text-black h-16 transition duration-300 shadow-md hover:shadow-xl px-4 w-full'>
        <h1 className='text-xl font-bold'>FIFIDIANANA 2024</h1>
        <div className='cursor-pointer' onClick={handleExit}>
          <RiLogoutBoxRLine size={24} style={{ cursor: 'pointer' }} />
        </div>
      </nav>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='italic font-bold mt-4'>
          Fifidianana SAMPANA <span className='not-italic uppercase'>'{voteName}'</span>
        </h1>

        <div className='p-4 w-full max-w-md' style={{ cursor: 'pointer' }}>
          {allSections.map(section => (
            <div key={section.id} className='p-4 w-full max-w-md'>
              <div className='bg-white rounded-lg shadow-lg p-4 transform transition-transform hover:scale-105'>
                <div className='flex w-full justify-between mb-4'>
                  <h2 className='text-lg font-semibold mb-2 text-center'>{section.name}</h2>
                  <h2 className='text-lg font-semibold mb-2 text-center'>{section.voteCountAllowed}</h2>
                </div>
                <div className='flex flex-col'>
                  {sectionCandidates[section.id]?.map(candidate => (
                    <button
                      key={candidate.id}
                      className={`mb-2 bg-transparent hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow`}
                      style={{
                        backgroundColor: clickedCandidates[section.id]?.includes(candidate.id) ? '#34D399' : 'transparent',
                      }}
                      onClick={() => handleCandidateVote(section.id, candidate.id)}
                    >
                      {candidate.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-center'>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded items-center' onClick={handleRefresh}>
            Feno
          </button>
        </div>
      </div>
    </div>
  );
}

export default ElectionDetail;
