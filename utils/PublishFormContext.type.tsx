export interface PublishFormState {
  header: string;
  researchers: [Researcher];
}

export interface Researcher {
  name: string;
  organization: string;
}

export interface Action {
  type: string;
  payload?: any;
}
