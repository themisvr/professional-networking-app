export class UserModel {
    userId: number;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    isAdmin: boolean;
    token?: string;
}
