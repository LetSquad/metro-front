export interface ResponseWithEditLock<T> {
    isLockedForEdit: boolean;
    data: T;
}

export interface BasePageResponse<T> {
    total: number;
    list: T[];
}
