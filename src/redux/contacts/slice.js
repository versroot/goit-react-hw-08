import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';
import { logout } from '../auth/operations';

const initialState = { items: [], isLoading: false, error: null };

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(fetchContacts.pending, s => { s.isLoading = true; })
      .addCase(fetchContacts.fulfilled, (s, { payload }) => {
        s.isLoading = false;
        s.items = payload;
      })
      .addCase(fetchContacts.rejected, (s, { payload }) => {
        s.isLoading = false;
        s.error = payload;
      })
      .addCase(addContact.fulfilled, (s, { payload }) => {
        s.items.push(payload);
      })
      .addCase(deleteContact.fulfilled, (s, { payload }) => {
        s.items = s.items.filter(c => c.id !== payload);
      })
      .addCase(logout.fulfilled, () => initialState),
});

export default contactsSlice.reducer;
