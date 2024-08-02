export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  emailAddress: string;
  role: string;
}

export interface CustomerDTO {
  id: string;
  username: string;
  role: string;
}

export interface LoginDTO {
  username: string;
  password: string;
}
