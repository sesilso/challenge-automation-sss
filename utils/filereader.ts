import XLSX from 'xlsx';
import path from 'path';

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