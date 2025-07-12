import React from 'react';
import { User, Star, Heart, Clock } from 'lucide-react';

const UserCard = ({ user, isShortlisted, onToggleShortlist }) => {
  const { name, age, interests, sharedInterests } = user;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{name}</h3>
            <p className="text-gray-600 flex items-center gap-1">
              <Clock size={14} />
              {age} years old
            </p>
          </div>
        </div>
        
        <button
          onClick={() => onToggleShortlist(user)}
          className={`p-2 rounded-full transition-all duration-200 ${
            isShortlisted
              ? 'bg-red-100 text-red-600 hover:bg-red-200'
              : 'bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-600'
          }`}
        >
          <Heart size={20} fill={isShortlisted ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <Star size={16} className="text-yellow-500" />
          Shared Interests ({sharedInterests?.length || 0})
        </h4>
        <div className="flex flex-wrap gap-2 mb-3">
          {sharedInterests?.map((interest, index) => (
            <span
              key={index}
              className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-2">All Interests</h4>
        <div className="flex flex-wrap gap-2">
          {interests?.map((interest, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-sm ${
                sharedInterests?.includes(interest)
                  ? 'bg-yellow-100 text-yellow-800 font-medium'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserCard;