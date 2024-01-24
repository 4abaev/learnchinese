export interface ServerError {
    error: {
        message: string;
        status: number;
        name: string;
    };
}

export interface IMovie {
    id: number;
    name: string;
    description: string;
    posterUrl: string;
    videoUrl: string;
    enSubsUrl: string;
    ruSubsUrl: string;
    zhSubsUrl: string;
    releaseDate: string;
    rate: number;
    hardLevel: number;
}

export interface ISerial {
    id: number;
    name: string;
    description: string;
    posterUrl: string;
    releaseDate: string;
    rate: number;
    hardLevel: number;
    Seazon: ISeazon[];
}

export interface ISeazon {
    id: number;
    number: number;
    Series: ISeries[];
}

export interface ISeries {
    number: number;
    description: string;
    videoUrl: string;
    enSubsUrl: string;
    ruSubsUrl: string;
    zhSubsUrl: string;
}

export interface ISubscriptions {
    id: string;
    isActive: boolean;
    startDay: string;
    dueToDay: string;
    createdAt: string;
}

export interface IUser {
    id: string;
    username: string;
    email: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    subscriptions: Subscriptions[];
}
