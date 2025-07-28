export function splitAndTrim(input: string, separator: string): Array<string>{
    return input.split(separator).map(x => x.trim());
}