import { RootState } from 'src/common/redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialValueProps, TimeProps } from './interface';

const initialValue: initialValueProps = {
  timeStartValue: new Date(),
  timeEndValue: new Date(),
  searchInputValue: '',
  isFilter: false,
  isDeleteSelected: false,
  isOpenMenu: null,
};

const eventPromotionIVSlice = createSlice({
  name: 'eventPromotionIV',
  initialState: initialValue,
  reducers: {
    updateTimeStart: (state, action: PayloadAction<TimeProps>) => {
      state.timeStartValue = action.payload;
    },
    updateTimeEnd: (state, action: PayloadAction<TimeProps>) => {
      state.timeEndValue = action.payload;
    },
    updateSearchInput: (state, action: PayloadAction<string>) => {
      state.searchInputValue = action.payload;
    },
    resetFormFilter: (state) => {
      state.timeEndValue = new Date();
      state.timeStartValue = new Date();
      state.searchInputValue = '';
    },
    udpateStatusMenu: (state, action) => {
      state.isOpenMenu = action.payload;
    },
  },
});

export default eventPromotionIVSlice.reducer;
export const {
  updateTimeStart,
  updateTimeEnd,
  updateSearchInput,
  resetFormFilter,
  udpateStatusMenu,
} = eventPromotionIVSlice.actions;

export const timeStartState = (state: RootState) => state.eventPromotionIV.timeStartValue;
export const timeEndState = (state: RootState) => state.eventPromotionIV.timeEndValue;
export const searchInputState = (state: RootState) =>
  state.eventPromotionIV.searchInputValue;
export const openMenuState = (state: RootState) => state.eventPromotionIV.isOpenMenu;
