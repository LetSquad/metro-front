export interface ResponseWithEditLock<T> {
    isLockedForEdit: boolean;
    data: T;
}
