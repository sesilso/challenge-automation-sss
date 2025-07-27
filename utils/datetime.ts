export function getUTCDateTime():string{
    const datetime = new Date();
    return datetime.toUTCString();
}