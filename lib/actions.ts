"use server";

import { supabase } from "@/lib/supabaseClient";

// --- EXPLORE & BOUNTIES ---
export async function getProfiles() {
  const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
  if (error) { console.error("Error fetching profiles:", error); return []; }
  return data || [];
}

export async function getBounties() {
  const { data } = await supabase.from('bounties').select('*').order('created_at', { ascending: false });
  return data || [];
}

export async function createBounty(bountyData: any) {
  const { data, error } = await supabase.from('bounties').insert([{ ...bountyData, status: 'open', escrow_locked: true }]).select().single();
  if (error) throw error;
  return data;
}

// --- FEED PAGE ---
export async function getPosts() {
  const { data, error } = await supabase.from('posts').select(`*, author:profiles (address, ens, handle, avatar_initial)`).order('created_at', { ascending: false });
  if (error) { console.error("Error fetching posts:", error); return []; }
  return data || [];
}

export async function createPost(content: string, authorAddress: string) {
  const addr = authorAddress.toLowerCase();
  await getOrCreateProfile(addr); // Ensure profile exists before posting
  const { data, error } = await supabase.from('posts').insert([{ content, author_address: addr, post_type: 'general' }]).select().single();
  if (error) throw error;
  return data;
}

export async function getTrendingBuilders() {
  const { data } = await supabase.from('profiles').select('*').limit(4);
  return data || [];
}

export async function getHotBounties() {
  const { data } = await supabase.from('bounties').select('*').eq('status', 'open').limit(3);
  return data || [];
}

// --- PROFILE PAGE ---
export async function getOrCreateProfile(address: string) {
  if (!address) return null;
  const addr = address.toLowerCase();
  
  const { data: profile } = await supabase.from('profiles').select('*').eq('address', addr).maybeSingle();
  if (profile) return profile;

  const { data: newProfile, error } = await supabase.from('profiles').insert([{ 
      address: addr, 
      handle: `@${addr.slice(2, 8)}`,
      avatar_initial: addr.slice(2,3).toUpperCase()
    }]).select().single();

  if (error) return null;
  return newProfile;
}

export async function getUserPosts(address: string) {
  if (!address) return [];
  const addr = address.toLowerCase();
  const { data } = await supabase.from('posts').select(`*, author:profiles (address, ens, handle, avatar_initial)`).eq('author_address', addr).order('created_at', { ascending: false });
  return data || [];
}

export async function updateProfile(address: string, updates: any) {
  if (!address) return null;
  const addr = address.toLowerCase();
  const { data, error } = await supabase.from('profiles').upsert({ address: addr, ...updates }).select().single();
  if (error) throw error;
  return data;
}