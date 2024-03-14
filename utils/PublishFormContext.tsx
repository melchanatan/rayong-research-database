import { createContext } from "react";
import { Action, PublishFormState } from "./PublishFormContext.type";

const publishFormDetails = {};

function publishFormReducer(state: PublishFormState, action: Action) {
  switch (action.type) {
    case "SET_HEADER":
      return { ...state, header: action.payload };
    case "SET_ABSTRACT":
      return { ...state, abstract: action.payload };
    case "SET_ORGANIZATION":
      return { ...state, organization: action.payload };
    case "SET_CONTACT_EMAIL":
      return { ...state, contactEmail: action.payload };
    case "ADD_RESEARCHER":
      return {
        ...state,
        researchers:
          state.researchers == undefined
            ? [action.payload]
            : [...state.researchers, action.payload],
      };
    case "REMOVE_RESEARCHER":
      return {
        ...state,
        researchers: state.researchers.filter(
          (researcher) => researcher.name !== action.payload.name
        ),
      };
    case "EDIT_RESEARCHER_NAME":
      return {
        ...state,
        researchers: state.researchers.map((researcher, index) => {
          if (index == action.payload.index) {
            const newState = researcher;
            newState.name = action.payload.value;
            return newState;
          } else {
            return researcher;
          }
        }),
      };
    case "EDIT_RESEARCHER_ORGANIZATION":
      return {
        ...state,
        researchers: state.researchers.map((researcher, index) => {
          if (index == action.payload.index) {
            const newState = researcher;
            newState.organization = action.payload.value;
            return newState;
          } else {
            return researcher;
          }
        }),
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
