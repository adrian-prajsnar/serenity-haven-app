import supabase from './supabase';
import { defaultBookingSettings } from '../utils/constants';

export async function getSettings() {
  const { data, error } = await supabase.from('settings').select('*').single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be loaded');
  }
  return data;
}

// newSetting = {setting: newValue}
export async function updateSetting(newSetting) {
  const { data, error } = await supabase
    .from('settings')
    .update(newSetting)
    .eq('id', 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Setting could not be updated');
  }
  return data;
}

export async function loadDefaultSettings() {
  const { data, error } = await supabase
    .from('settings')
    .update([defaultBookingSettings])
    .eq('id', 1);

  if (error) {
    console.error(error);
    throw new Error('Default settings could not be loaded');
  }
  return data;
}
