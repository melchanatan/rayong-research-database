export interface PublishFormState {
  header: string;
  researchers: Array<Researcher>;
}

export interface Researcher {
  name: string;
  organization: string;
}

export interface Action {
  type: string;
  payload?: any;
}
