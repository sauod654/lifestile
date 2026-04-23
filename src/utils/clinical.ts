import { supabase } from '@/lib/supabase';

export async function getRecentVitals(patientId: string) {
  const { data, error } = await supabase
    .from('vitals')
    .select('*')
    .eq('patient_id', patientId)
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) throw error;
  return data;
}

export async function submitVitalSigns(vitalData: any) {
  const { data, error } = await supabase
    .from('vitals')
    .insert([vitalData]);

  if (error) throw error;
  return data;
}

export async function getHydrationLevel(profileId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from('hydration_logs')
    .select('amount_ml')
    .eq('profile_id', profileId)
    .gte('created_at', today.toISOString());

  if (error) throw error;
  
  const total = data.reduce((acc, curr) => acc + curr.amount_ml, 0);
  return total;
}

export async function logWaterIntake(profileId: string, amountMl: number) {
  const { data, error } = await supabase
    .from('hydration_logs')
    .insert([{ profile_id: profileId, amount_ml: amountMl }]);

  if (error) throw error;
  return data;
}

export async function getGlobalHydrationAverage() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from('hydration_logs')
    .select('amount_ml')
    .gte('created_at', today.toISOString());

  if (error) throw error;
  
  if (data.length === 0) return 0;
  
  const total = data.reduce((acc, curr) => acc + curr.amount_ml, 0);
  // This is a simple sum for the demo, in a real app we'd divide by number of active users
  return total / 1000; 
}

export async function searchPatients(query: string) {
  const { data, error } = await supabase
    .from('patients')
    .select('*, profiles(full_name, avatar_url)')
    .or(`employee_id_label.ilike.%${query}%, profiles.full_name.ilike.%${query}%`)
    .limit(5);

  if (error) throw error;
  return data;
}

export async function getAllPatients() {
  const { data, error } = await supabase
    .from('patients')
    .select('*, profiles(full_name, avatar_url)')
    .order('last_seen', { ascending: false });

  if (error) throw error;
  return data;
}
