import { useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

// Максимальное количество попыток
const MAX_RETRIES = 3;
// Задержка между попытками (в миллисекундах)
const RETRY_DELAY = 1000;

// Функция для повторных попыток
async function retryOperation<T>(
  operation: () => Promise<T>,
  retries = MAX_RETRIES,
  delay = RETRY_DELAY
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return retryOperation(operation, retries - 1, delay * 2);
    }
    throw error;
  }
}

export function useDatabase() {
  const getProfile = useCallback(async (userId: string) => {
    return retryOperation(async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      return data;
    });
  }, []);

  const updateProfile = useCallback(async (userId: string, updates: Partial<Database['public']['Tables']['profiles']['Update']>) => {
    return retryOperation(async () => {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', userId);

      if (error) throw error;
    });
  }, []);

  const getReservations = useCallback(async (userId: string) => {
    return retryOperation(async () => {
      const { data, error } = await supabase
        .from('exchange_reservations')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    });
  }, []);

  const createReservation = useCallback(async (reservation: Database['public']['Tables']['exchange_reservations']['Insert']) => {
    return retryOperation(async () => {
      const { error } = await supabase
        .from('exchange_reservations')
        .insert(reservation);

      if (error) throw error;
    });
  }, []);

  const updateReservation = useCallback(async (id: string, updates: Database['public']['Tables']['exchange_reservations']['Update']) => {
    return retryOperation(async () => {
      const { error } = await supabase
        .from('exchange_reservations')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
    });
  }, []);

  const deleteReservation = useCallback(async (id: string) => {
    return retryOperation(async () => {
      const { error } = await supabase
        .from('exchange_reservations')
        .delete()
        .eq('id', id);

      if (error) throw error;
    });
  }, []);

  return {
    getProfile,
    updateProfile,
    getReservations,
    createReservation,
    updateReservation,
    deleteReservation
  };
}