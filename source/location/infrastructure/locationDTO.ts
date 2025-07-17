export default interface LocationDTO {
    date: Date;
    userID: string;
    encriptedLocation: string;
    iv: string;
    tag: string;
    id?: string;
}