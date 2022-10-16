export const localStorageGetReduxState = () => {
    const serializedState = localStorage.getItem("MYANIME");
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
};
export const localStorageSaveReduxState = (state) => {
    const serializedState = JSON.stringify(state);
    return localStorage.setItem("MYANIME", serializedState);
};
