// src/features/auth/authService.js
import { supabase } from 'src/api/supabaseClient';

export const login = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
};

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    throw new Error(error.message);
  }
  return data.session;
};

export const onAuthStateChange = (callback) => {
  const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
    callback(session);
  });

  return () => {
    authListener.subscription.unsubscribe();
  };
};