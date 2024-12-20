import { useState, useCallback } from 'react';
import axios from 'axios';
import { Contact } from '../types/contact';
import { getApiUrl } from "../utils/env";

export function useContactManagement() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_URL = getApiUrl();

  const fetchContacts = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/contacts`);
      setContacts(response.data);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError("Failed to fetch contacts");
      setLoading(false);
    }
  }, []);

  const updateContact = useCallback(async (id: string, data: Partial<Contact>) => {
    try {
      await axios.put(`${API_URL}/api/v1/contacts/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await fetchContacts();
      return true;
    } catch (err) {
      console.error('Error updating contact:', err);
      setError("Failed to update contact");
      return false;
    }
  }, [fetchContacts]);

  const deleteContact = useCallback(async (id: string) => {
    try {
      await axios.delete(`${API_URL}/api/v1/contacts/${id}`);
      await fetchContacts();
      return true;
    } catch (err) {
      setError("Failed to delete contact");
      return false;
    }
  }, [fetchContacts]);

  return {
    contacts,
    loading,
    error,
    fetchContacts,
    updateContact,
    deleteContact,
  };
}
