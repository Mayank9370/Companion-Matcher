import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import ProfileForm from './components/ProfileForm';
import MatchesList from './components/MatchesList';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleProfileCreated = (username) => {
    setCurrentUser(username);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Heart className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  MatchMaker
                </h1>
                <p className="text-sm text-gray-600">Find your perfect connection</p>
              </div>
            </div>
            
            {currentUser && (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
                <Sparkles size={16} className="text-green-600" />
                <span className="text-green-800 font-medium">Welcome, {currentUser}!</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileForm onProfileCreated={handleProfileCreated} />
        <MatchesList currentUser={currentUser} />
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600">
            <p className="flex items-center justify-center gap-2">
              Made with <Heart size={16} className="text-red-500" /> for meaningful connections
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;