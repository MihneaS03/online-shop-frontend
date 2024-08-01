export interface Customer {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  emailAddress: string;
  role: string;
}

export interface LoginDTO {
  username: string;
  password: string;
}