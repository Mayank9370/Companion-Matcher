const { supabase } = require('../config/supabaseClient');

exports.addUser = async ({ name, age, interests }) => {
  const { error } = await supabase
    .from('users')
    .insert([{ name, age, interests }]);
  if (error) throw new Error(error.message);
};

exports.findMatchesByUsername = async (username) => {
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('name', username)
    .single();

  if (userError || !userData) throw new Error('User not found');

  const { data: allUsers, error: allError } = await supabase
    .from('users')
    .select('name, interests');

  if (allError) throw new Error(allError.message);

  const matches = allUsers.filter(u => {
    if (u.name.toLowerCase() === username.toLowerCase()) return false;

    const shared = u.interests.filter(i => userData.interests.includes(i));
    return shared.length >= 2;
  });

  return matches;
};