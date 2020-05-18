import { Connection, Repository } from 'typeorm';
import { NestCrawlerService } from 'nest-crawler';
import { CrawlDomain, CrawlPage } from './crawler.entity';
export declare class CrawlerService {
    private readonly crawlDomainRepository;
    private readonly crawlPageRepository;
    private readonly newCrawler;
    private readonly connection;
    private isCrawling;
    private browser;
    constructor(crawlDomainRepository: Repository<CrawlDomain>, crawlPageRepository: Repository<CrawlPage>, newCrawler: NestCrawlerService, connection: Connection);
    nestCrawl(): Promise<void>;
    nestCrawlUser(): Promise<void>;
    private crawl;
    private crawler;
    findAll(): Promise<any>;
    getConfig(): any;
    setConfig(maxDepth: number, maxPages: number): any;
    isCrawlSubDomainDone(subDomain: string): Promise<any>;
    isUserCrawlerDone(userId: number, domainId: number): Promise<boolean>;
    getUserCrawlResults(userId: number, domainId: number): Promise<boolean>;
    deleteUserCrawler(userId: number, domainId: number): Promise<boolean>;
    crawlDomain(userId: number, subDomain: string, domain: string, domainId: number, maxDepth: number, maxPages: number): Promise<any>;
    getCrawlResultsCrawlDomainID(crawlDomainID: number): Promise<any>;
    delete(crawlDomainId: number): Promise<any>;
    getDomainId(userId: number, domain: string): Promise<number>;
}