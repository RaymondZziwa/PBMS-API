export interface IAEntry {
  log_id: number;
  user_id: number;
  log_date: string; // Use string for date representation (or Date if you want to use Date objects)
  time_in: string; // Use string if you are storing time in ISO string format, or Date if using Date objects
  time_out: string; // Same as time_in
  hours_worked: number | null; // Can be a number or null if not calculated yet
  physical_proof_in: string; // URL or path to the proof image
  physical_proof_out: string; // URL or path to the proof image
  created_at: string; // ISO string date
  updated_at: string; // ISO string date
}
