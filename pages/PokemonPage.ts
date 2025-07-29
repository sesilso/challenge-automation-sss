import {Page, expect, Locator, APIResponse} from '@playwright/test';
import {capitalizedFirtLetter} from '@utils/strings';
import {prepareFolderDirectory,generateNewFile} from '@utils/files';
import path from 'path';
import fs from 'fs';

export class PokemonPage{
    private page: Page;
    private contentTitle: Locator;
    private artworkAuthor: Locator;
    private pokemonImg: Locator;

    constructor(page: Page){
        this.page = page;
        this.contentTitle = this.page.locator('.mw-page-title-main');
        this.artworkAuthor = this.page.locator('.infobox-caption');
        this.pokemonImg = this.page.locator('td.infobox-image img.mw-file-element');
    }

    async navigate(path: string): Promise<void>{
        await this.page.goto(path);
    }

    async getContentTitle(): Promise<string>{
        const contTitle = await this.contentTitle.textContent();
        if(!contTitle){
            throw new Error(`There is no text for Content Title: ${this.contentTitle}`);
        }
        return contTitle.trim();
    }

    async assertPageTitle(text: string):Promise<void>{
        expect((await this.page.title()).toLowerCase()).toContain(text);
    }

    async logArtworkAuthor():Promise<void>{
        const author = await this.artworkAuthor.textContent();
        if(!author){
            throw new Error(`There is no text for Artwork author: ${this.artworkAuthor}`);
        }
        console.log(author.trim());
    }

    
    async assertFileExtention(filePath: string): Promise<void>{
        const validExtentions = ['.jpe', '.jpeg', '.png', '.svg'];
        const fileExtention = path.extname(filePath).toLowerCase();
        expect(validExtentions).toContain(fileExtention);
    }

    async assertFileSize(filePath: string): Promise<void>{
        const fileStats = await fs.promises.stat(filePath);
        const fileSize = fileStats.size;
        expect(fileSize).toBeLessThan(50000);
    }

    async downloadImageAndGetPath(outputFolder: string):Promise<string>{
        await expect(this.pokemonImg).toBeVisible();
        await prepareFolderDirectory(outputFolder);
        const {imgUrl, fileName} = await this.getImageElementData(this.pokemonImg);
        const buffer = await this.getImageBuffer(imgUrl);
        return await generateNewFile(fileName, outputFolder, buffer);
    }

    async getImageElementData(imgLocator: Locator): Promise<{imgUrl: string, fileName:string}>{
        const src = await imgLocator.getAttribute('src');
        if(!src){
            throw new Error('No attribute src found for image');
        }
        const imgUrl = src.startsWith('//')? 'https:'+src: src;
        const fileName = imgUrl.split('/').pop();
        if(!fileName){
            throw new Error('Could not define file name.');
        }
        return {imgUrl, fileName};
    }

    async getImageBuffer(imgUrl: string): Promise<Buffer>{
        const response = await this.page.request.get(imgUrl);
        if(!response.ok){
            throw new Error('There was an error when trying to download to generate buffer: ' + imgUrl);
        }
        return await response.body();
    }

}