import React, { useState } from 'react';
import { User, Heart, Plus, X } from 'lucide-react';
import { userAPI } from '../services/api';

const ProfileForm = ({ onProfileCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    interests: []
  });
  const [currentInterest, setCurrentInterest] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddInterest = () => {
    if (currentInterest.trim() && !formData.interests.includes(currentInterest.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, currentInterest.trim()]
      }));
      setCurrentInterest('');
    }
  };

  const handleRemoveInterest = (interestToRemove) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(interest => interest !== interestToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age || formData.interests.length === 0) {
      alert('Please fill all fields and add at least one interest');
      return;
    }

    setIsSubmitting(true);
    try {
      await userAPI.createUser({
        name: formData.name,
        age: parseInt(formData.age),
        interests: formData.interests
      });
      
      onProfileCreated(formData.name);
      setFormData({ name: '', age: '', interests: [] });
      alert('Profile created successfully!');
    } catch (error) {
      alert(error.message || 'Error creating profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <User className="text-blue-600" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">Create Your Profile</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              placeholder="Enter your name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Age
            </label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              placeholder="Enter your age"
              min="18"
              max="100"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Interests
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={currentInterest}
              onChange={(e) => setCurrentInterest(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddInterest())}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              placeholder="Add an interest (e.g., Reading, Hiking, Cooking)"
            />
            <button
              type="button"
              onClick={handleAddInterest}
              className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
            >
              <Plus size={18} />
              Add
            </button>
          </div>
          
          {formData.interests.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.interests.map((interest, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2 group hover:bg-blue-200 transition-colors duration-200"
                >
                  {interest}
                  <button
                    type="button"
                    onClick={() => handleRemoveInterest(interest)}
                    className="text-blue-600 hover:text-red-600 transition-colors duration-200"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Creating Profile...
            </>
          ) : (
            <>
              <Heart size={20} />
              Create Profile & Find Matches
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;