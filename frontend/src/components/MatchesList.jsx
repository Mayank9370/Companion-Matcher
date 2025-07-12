import React, { useState, useEffect } from 'react';
import { Search, Users, Heart, Filter } from 'lucide-react';
import UserCard from './UserCard';
import { userAPI } from '../services/api';

const MatchesList = ({ currentUser }) => {
  const [matches, setMatches] = useState([]);
  const [shortlistedUsers, setShortlistedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all' or 'shortlisted'

  useEffect(() => {
    if (currentUser) {
      fetchMatches();
    }
  }, [currentUser]);

  useEffect(() => {
    // Load shortlisted users from localStorage
    const saved = localStorage.getItem('shortlistedUsers');
    if (saved) {
      setShortlistedUsers(JSON.parse(saved));
    }
  }, []);

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const data = await userAPI.getMatches(currentUser);
      setMatches(data);
    } catch (error) {
      console.error('Error fetching matches:', error);
      // Show user-friendly error message
      setMatches([]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleShortlist = (user) => {
    const isCurrentlyShortlisted = shortlistedUsers.some(u => u.name === user.name);
    
    let updatedShortlist;
    if (isCurrentlyShortlisted) {
      updatedShortlist = shortlistedUsers.filter(u => u.name !== user.name);
    } else {
      updatedShortlist = [...shortlistedUsers, user];
    }
    
    setShortlistedUsers(updatedShortlist);
    localStorage.setItem('shortlistedUsers', JSON.stringify(updatedShortlist));
  };

  const filteredMatches = filter === 'shortlisted' 
    ? shortlistedUsers 
    : matches;

  if (!currentUser) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
        <Search className="mx-auto text-gray-400 mb-4" size={48} />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Profile Created</h3>
        <p className="text-gray-500">Create your profile first to find potential matches!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Users className="text-purple-600" size={28} />
          <h2 className="text-2xl font-bold text-gray-800">
            {filter === 'shortlisted' ? 'Your Shortlist' : 'Your Matches'}
          </h2>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
              filter === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Filter size={16} />
            All Matches ({matches.length})
          </button>
          <button
            onClick={() => setFilter('shortlisted')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
              filter === 'shortlisted'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Heart size={16} />
            Shortlisted ({shortlistedUsers.length})
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3 text-gray-600">
            <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="font-medium">Finding your perfect matches...</span>
          </div>
        </div>
      ) : filteredMatches.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {filter === 'shortlisted' ? 'No Shortlisted Users' : 'No Matches Found'}
          </h3>
          <p className="text-gray-500">
            {filter === 'shortlisted' 
              ? 'Start shortlisting users you\'re interested in!' 
              : 'Try creating a profile with different interests to find more matches.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredMatches.map((user, index) => (
            <UserCard
              key={`${user.name}-${index}`}
              user={user}
              isShortlisted={shortlistedUsers.some(u => u.name === user.name)}
              onToggleShortlist={handleToggleShortlist}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchesList;