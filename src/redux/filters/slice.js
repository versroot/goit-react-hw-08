import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: '',
  reducers: {
    setFilter: (_, { payload }) => payload,
  },
});

export const { setFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
