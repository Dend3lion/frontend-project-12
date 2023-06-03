/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = { isShown: false, modalType: null, extras: {} };

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal: (state, { payload }) => {
      state.isShown = payload.isShown;
      state.modalType = payload.modalType;
      state.extras = payload.extras;
    },
  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;
