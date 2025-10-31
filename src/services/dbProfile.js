// This file contains functions to interact directly with the supabase tables for this project
// These functions are never used directly in .vue files
// Imported into useUserStore and useChallengeStore to be used

export async function dbGetLearnerStats(supa, user_id) {
  const { data, error } = await supa
    .rpc('getlearnerstats', { p_user_id: user_id });
  if (error) throw error;
  return data[0];
}

export async function dbUploadLearnerStats(supa, user_id, difficulty, avgTime, succPercentage, numCompleted) {
  const { data, error } = await supa
    .from('learner_profile')
    .upsert({ user_id: user_id, average_time_taken: avgTime, difficulty_level: difficulty, success_percentage: succPercentage, number_completed: numCompleted })
    .select()
  if (error) throw error;
  return data;
}