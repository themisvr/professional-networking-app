import { PersonalInfoModel } from "./personalInfo";

export class ConnectionModel {
    userId: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    personalInfo: PersonalInfoModel;
};