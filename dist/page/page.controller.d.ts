import { PageService } from './page.service';
export declare class PageController {
    private readonly pageService;
    constructor(pageService: PageService);
    getAllPages(): Promise<any>;
}
