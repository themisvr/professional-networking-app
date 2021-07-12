export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    isAdmin: boolean;
    token?: string;
}
  