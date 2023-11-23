export type Alert = {
    id?: string;
    type?: AlertType;
    message?: string;  
    fade?: boolean;  
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}
