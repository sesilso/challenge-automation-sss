import XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

export function convertExcelPageToJson(filepath: string,filename: string, page: number|string): Array<Record<string, any>>{
    const normalizedFilePath = path.resolve(filepath);
    const xlsxfilepath = path.join(normalizedFilePath,filename);
    const workbook = XLSX.readFile(xlsxfilepath);
    if(typeof page === 'string'){
        const sheetName = page;
        const sheet = workbook.Sheets[sheetName];
        return XLSX.utils.sheet_to_json(sheet);
    }    
    if(typeof page === 'number'){
        const sheetName = workbook.SheetNames[page];
        const sheet = workbook.Sheets[sheetName];
        return XLSX.utils.sheet_to_json(sheet);
    }else{
        throw new Error('Invalid argument {page} - only string(for page name) or number(for page number) are supported.');
    }    
}

export async function prepareFolderDirectory(folderName: string): Promise<void>{
    const folderPath = path.resolve(process.cwd(), folderName);
    if(!fs.existsSync(folderPath)){
        fs.mkdirSync(folderPath, {recursive: true});
        console.log(`Folder: ${folderName} not found. Created folder in ${folderPath}`);
    }
}

export async function generateNewFile(fileName: string, outputFolder: string,buffer: Buffer): Promise<string>{
    try{
        const folderPath = path.resolve(process.cwd(), outputFolder);
        const imgPath = path.join(folderPath, fileName);
        fs.writeFileSync(imgPath, buffer);
        return imgPath;
    }catch(error){
        console.warn(error);
        throw error;
    }
}