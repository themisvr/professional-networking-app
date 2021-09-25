export class UserModel {
    userId: number;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    avatar: Blob[];
    isAdmin: boolean;
    token?: string;
}
