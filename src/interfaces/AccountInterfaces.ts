export interface Address {
  affiliation: string;
  street: string;
  city: string;
  zip: number;
  state: string;
  country: string;
}

export interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
}
