import {Page, expect, Locator} from '@playwright/test';
import {capitalizedFirtLetter} from '@utils/strings';

export class PokemonPage{
    private page: Page;
    private contentTitle: Locator;
    private artworkAuthor: Locator;
    private pokemonImg: string;

    constructor(page: Page){
        this.page = page;
        this.contentTitle = this.page.locator('.mw-page-title-main');
        this.artworkAuthor = this.page.locator('.infobox-caption');
        this.pokemonImg = 'img.mw-file-element[src*="pokename_art.png"]';
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

    async assertPokemonImgIsVisible(name: string):Promise<void>{
        const imgLocator = this.page.locator(this.pokemonImg.replace('pokename',capitalizedFirtLetter(name)))
        await expect(imgLocator).toBeVisible();
        await imgLocator.screenshot({path: `images/${name}.png`});
    }

}