import { useState, useEffect, useCallback } from 'react';

interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: T) => void;
  removeValue: () => void;
}

export const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): UseLocalStorageReturn<T> => {
  // State to store the value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage:', error);
      return initialValue;
    }
  });

  // Function to save to localStorage
  const setValue = useCallback(
    (value: T) => {
      try {
        setStoredValue(value);
        
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(value));
        }
      } catch (error) {
        console.error('Error setting localStorage:', error);
      }
    },
    [key]
  );

  // Function to remove from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }, [key, initialValue]);

  return { value: storedValue, setValue, removeValue };
};
