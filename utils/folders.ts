import fs from 'fs';
import path from 'path';

export async function prepareFolderDirectory(folderName: string): Promise<void>{
    const folderPath = path.resolve(process.cwd(), folderName);
    if(!fs.existsSync(folderPath)){
        fs.mkdirSync(folderPath, {recursive: true});
        console.log(`Folder: ${folderName} not found. Created folder in ${folderPath}`);
    }else{
        console.log(`Folder: ${folderName} found. Skipped folder creation.`);
    }
}