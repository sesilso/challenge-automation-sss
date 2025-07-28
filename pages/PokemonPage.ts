import {Page, Locator} from '@playwright/test';

export class PokemonPage{
    private page: Page;
    private contentTitle: Locator;

    constructor(page: Page){
        this.page = page;
        this.contentTitle = this.page.locator('.mw-page-title-main');
    }

    async navigate(){
        await this.page.goto('');
    }

    async getContentTitle(): Promise<string>{
        const contTitle = await this.contentTitle.textContent();
        if(!contTitle){
            throw new Error(`There is no text for Content Title: ${this.contentTitle}`);
        }
        return contTitle.trim();
    }
}