import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aokvisoqggsolnrttopb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFva3Zpc29xZ2dzb2xucnR0b3BiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0NDU4MjcsImV4cCI6MjEwNDAyMTgyN30.ok4tu0YAfwmoHJfYxR7kuC-opXY803nfEkE9IubtHK8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
