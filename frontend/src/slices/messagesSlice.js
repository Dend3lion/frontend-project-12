import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { actions as channelActions } from './channelsSlice';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
    removeMessages: messagesAdapter.removeMany,
  },
  extraReducers: (builder) => {
    builder.addCase(channelActions.removeChannel, (state, { payload }) => {
      const restComments = Object.values(state.entities).filter(
        (comment) => comment.channelId !== payload,
      );
      messagesAdapter.setAll(state, restComments);
    });
  },
});

export const { actions } = messagesSlice;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
