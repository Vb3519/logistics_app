import { createSlice } from '@reduxjs/toolkit';

interface DailyPlanState {
  dailyParcelsCollected: number;
  dailyShipmentsCreated: number;
  dailyShipmentsApproved: number;
  allActionsCounter: number;
}

interface DailyPlanSlice {
  dailyPlan: DailyPlanState;
}

const initialState: DailyPlanState = {
  dailyParcelsCollected: 0,
  dailyShipmentsCreated: 0,
  dailyShipmentsApproved: 0,
  allActionsCounter: 0,
};

const dailyPlanSlice = createSlice({
  name: 'dailyPlan',
  initialState: initialState,
  reducers: {
    incrementParcelsCollected: (state) => {
      return {
        ...state,
        dailyParcelsCollected: state.dailyParcelsCollected + 1,
        allActionsCounter: state.allActionsCounter + 1,
      };
    },

    incrementShipmentsCreated: (state) => {
      state.dailyShipmentsCreated += 1;
      state.allActionsCounter += 1;
    },

    incrementShipmentsApproved: (state) => {
      state.dailyShipmentsApproved += 1;
      state.allActionsCounter += 1;
    },
  },
});

// Действия:
export const {
  incrementParcelsCollected,
  incrementShipmentsCreated,
  incrementShipmentsApproved,
} = dailyPlanSlice.actions;

// Состояние:
export const selectDailyParcelsCollected = (state: DailyPlanSlice) =>
  state.dailyPlan.dailyParcelsCollected;

export const selectDailyShipmentsCreated = (state: DailyPlanSlice) =>
  state.dailyPlan.dailyShipmentsCreated;

export const selectDailyShipmentsApproved = (state: DailyPlanSlice) =>
  state.dailyPlan.dailyShipmentsApproved;

export const selectAllActionsCounter = (state: DailyPlanSlice) =>
  state.dailyPlan.allActionsCounter;

export default dailyPlanSlice.reducer;
