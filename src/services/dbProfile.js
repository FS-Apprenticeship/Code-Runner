export async function dbUploadLearnerProfile(
  supa,
  user_id,
  difficulty,
  average_time,
  success_percentage,
  completed
) {
  const { data, error } = await supa
    .from("learner_profile")
    .insert({
      user_id: user_id,
      difficulty_level: difficulty,
      average_time_taken: average_time,
      success_percentage: success_percentage,
      number_completed: completed,
    })
    .select();
  if (error) throw error;
  return data[0];
}

export async function dbGetProfileStats(supa, user_id) {
  const { data, error } = await supa.rpc("getLearnerStats", {
    p_user_id: user_id,
  });

  if (error) throw error;
  return data;
}