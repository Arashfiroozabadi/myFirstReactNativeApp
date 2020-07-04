import { createStore, combineReducers } from "redux";

type Theme = "dark" | "light";
type ThemeAction = {
  type: string;
};
const initialState: Theme = "dark";

function theme(state = initialState, action: ThemeAction): string {
  switch (action.type) {
    case "dark":
      return "dark";
    case "light":
      return "light";
    default:
      return state;
  }
}

function counter(state: number, action: { type: string }): number | string {
  if (typeof state === "undefined") {
    return 0;
  }
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

// A very simple store
const store = createStore(combineReducers({ count: counter, theme: theme }));

export default store;
