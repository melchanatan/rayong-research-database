import { createContext } from "react";
import { Action, PublishFormState } from "./PublishFormContext.type";

const publishFormDetails = {};

function publishFormReducer(state: PublishFormState, action: Action) {
  switch (action.type) {
    case "SET_HEADER":
      return { ...state, header: action.payload };
    case "ADD_RESEARCHER":
      return {
        ...state,
        researchers: [...state.researchers, action.payload],
      };
    case "REMOVE_RESEARCHER":
      return {
        ...state,
        researchers: state.researchers.filter(
          (researcher) => researcher.name !== action.payload.name
        ),
      };
    case "SET_ABSTRACT":
      return { ...state, abstract: action.payload };
    default:
      return state;
  }
}

const PublishFormContext = createContext<
  | {
      state: PublishFormState;
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);
export { PublishFormContext, publishFormReducer, publishFormDetails };
