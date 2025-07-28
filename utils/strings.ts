export function splitAndTrim(input: string, separator: string): Array<string>{
    return input.split(separator).map(x => x.trim());
}

export function capitalizedFirtLetter(input: string): string{
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase(); 
}