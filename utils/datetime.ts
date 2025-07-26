export function getUTCDateTime():string{
    const datetime = new Date();
    return `UTC: ${datetime.toUTCString()}`;
}