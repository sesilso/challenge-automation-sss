import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

export function getHashedKey():string {
    const value = process.env.SECRET_KEY;
    if(!value){
        throw new Error('Environment vaiable {SECRET_KEY} is not defined.');
    }
    return hashInput(value);
}

function hashInput(input: string): string{
    return crypto.createHash('sha256').update(input).digest('hex');
}

