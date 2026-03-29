import { supabase } from './supabase';
import type { Site } from './types';

export async function fetchSites(userId: string): Promise<Site[]> {
  const { data } = await supabase
    .from('ap_sites')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  return data || [];
}

export async function createSite(userId: string, domain: string, name: string): Promise<Site | null> {
  const trackingId = 'ap_' + crypto.randomUUID().slice(0, 12);
  const { data, error } = await supabase
    .from('ap_sites')
    .insert({ user_id: userId, domain, name, tracking_id: trackingId })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteSite(siteId: string): Promise<void> {
  await supabase.from('ap_sites').delete().eq('id', siteId);
}
