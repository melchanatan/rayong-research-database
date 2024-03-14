export interface PublishFormState {
  header: string;
  abstract: string;
  tags: [string];
  organization: string;
  contactEmail: string;
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
