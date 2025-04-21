import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.goit.global';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async (_, thunkAPI) => {
  try {
    const { data } = await axios.get('/contacts');
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const addContact = createAsyncThunk('contacts/add', async (contact, thunkAPI) => {
  try {
    const { data } = await axios.post('/contacts', contact);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const deleteContact = createAsyncThunk('contacts/delete', async (id, thunkAPI) => {
  try {
    await axios.delete(`/contacts/${id}`);
    return id;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
