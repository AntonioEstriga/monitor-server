import { Controller, InternalServerErrorException, Post, Get, Request, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TagService } from './tag.service';
import { Tag } from './tag.entity';
import { success } from '../lib/response';

@Controller('tag')
export class TagController {

  constructor(private readonly tagService: TagService) { }

  @UseGuards(AuthGuard('jwt-admin'))
  @Post('create')
  async createOfficialTag(@Request() req: any): Promise<any> {
    const tag = new Tag();
    tag.Name = req.body.name;
    tag.Show_in_Observatorio = req.body.observatory;
    tag.Creation_Date = new Date();

    const websites = JSON.parse(req.body.websites);
    
    const createSuccess = await this.tagService.createOne(tag, websites);

    if (!createSuccess) {
      throw new InternalServerErrorException();
    }

    return success(true);
  }

  @UseGuards(AuthGuard('jwt-admin'))
  @Post('update')
  async updateOfficialTag(@Request() req: any): Promise<any> {
    const tagId = req.body.tagId;
    const name = req.body.name;
    const observatory = req.body.observatory;
    const defaultWebsites = JSON.parse(req.body.defaultWebsites);
    const websites = JSON.parse(req.body.websites);
    
    const updateSuccess = await this.tagService.update(tagId, name, observatory, defaultWebsites, websites);

    if (!updateSuccess) {
      throw new InternalServerErrorException();
    }

    return success(true);
  }

  @UseGuards(AuthGuard('jwt-admin'))
  @Post('delete')
  async deleteOfficialTag(@Request() req: any): Promise<any> {
    const tagId = req.body.tagId;
    
    const deleteSuccess = await this.tagService.delete(tagId);
    if (!deleteSuccess) {
      throw new InternalServerErrorException();
    }

    return success(true);
  }

  @UseGuards(AuthGuard('jwt-study'))
  @Post('user/create')
  async createStudyMonitorUserTag(@Request() req: any): Promise<any> {
    const tag = new Tag();
    tag.Name = req.body.user_tag_name;
    tag.UserId = req.user.userId;
    tag.Show_in_Observatorio = 0;
    tag.Creation_Date = new Date();

    const type = req.body.type;
    const tagsId = JSON.parse(req.body.tagsId);

    const createSuccess = await this.tagService.createUserTag(tag, type, tagsId);

    if (!createSuccess) {
      throw new InternalServerErrorException();
    }

    return success(true);
  }

  @UseGuards(AuthGuard('jwt-study'))
  @Post('user/remove')
  async removeStudyMonitorUserTag(@Request() req: any): Promise<any> {
    const tagsId = JSON.parse(req.body.tagsId);

    const removeSuccess = await this.tagService.removeUserTag(req.user.userId, tagsId);

    if (!removeSuccess) {
      throw new InternalServerErrorException();
    }

    return success(await this.tagService.findAllFromStudyMonitorUser(req.user.userId));
  }

  @UseGuards(AuthGuard('jwt-admin'))
  @Get('exists/:tagName')
  async checkIfTagNameExists(@Param('tagName') tagName: string): Promise<boolean> {
    return success(!!await this.tagService.findByOfficialTagName(tagName.toLowerCase()));
  }

  @UseGuards(AuthGuard('jwt-admin'))
  @Get('all')
  async getAllTags(): Promise<any> {
    return success(await this.tagService.findAll());
  }

  @UseGuards(AuthGuard('jwt-admin'))
  @Get(':tag/user/:user/websites/study')
  async getUserTagWebsites(@Param('tag') tag: string, @Param('user') user: string): Promise<any> {
    const websites = await this.tagService.findAllUserTagWebsites(tag, user);

    for (const website of websites || []) {
      website['imported'] = await this.tagService.verifyUpdateWebsiteAdmin(website.WebsiteId);

      const websiteAdmin = await this.tagService.domainExistsInAdmin(website.WebsiteId);
      website['hasDomain'] = websiteAdmin.length === 1;
      website['webName'] = undefined;

      if (websiteAdmin.length === 1) {
        website['webName'] = websiteAdmin[0].Name;
      }
    }

    return success(websites);
  }

  @UseGuards(AuthGuard('jwt-admin'))
  @Get(':tag/user/:user/websites')
  async getTagWebsites(@Param('tag') tag: string, @Param('user') user: string): Promise<any> {
    return success(await this.tagService.findAllUserTagWebsites(tag, user));
  }

  @UseGuards(AuthGuard('jwt-admin'))
  @Get(':tag/website/:website/user/:user/pages')
  async getUserWebsitePages(@Param('tag') tag: string, @Param('website') website: string, @Param('user') user: string): Promise<any> {
    return success(await this.tagService.findAllUserWebsitePages(tag, website, user));
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('info/:tagId')
  async getTagInfo(@Param('tagId') tagId: number): Promise<any> {
    return success(await this.tagService.findInfo(tagId));
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('allOfficial')
  async getAllOfficialTags(): Promise<any> {
    return success(await this.tagService.findAllOfficial());
  }

  @UseGuards(AuthGuard('jwt-admin'))
  @Get('studyMonitor/total')
  async getNumberOfStudyMonitorUsers(): Promise<any> {
    return success(await this.tagService.findNumberOfStudyMonitor());
  }

  @UseGuards(AuthGuard('jwt-admin'))
  @Get('observatory/total')
  async getNumberOfObservatoryTags(): Promise<any> {
    return success(await this.tagService.findNumberOfObservatory());
  }

  @UseGuards(AuthGuard('jwt-study'))
  @Get('studyMonitor')
  async getStudyMonitorUserTags(@Request() req: any): Promise<any> {
    return success(await this.tagService.findAllFromStudyMonitorUser(req.user.userId));
  }

  @UseGuards(AuthGuard('jwt-study'))
  @Get('studyMonitor/:tag/data')
  async getStudyMonitorUserTagData(@Request() req: any, @Param('tag') tag: string): Promise<any> {
    return success(await this.tagService.findStudyMonitorUserTagData(req.user.userId, tag));
  }

  @UseGuards(AuthGuard('jwt-study'))
  @Get('studyMonitor/:tag/website/:website/data')
  async getStudyMonitorUserTagWebsitesPagesData(@Request() req: any, @Param('tag') tag: string, @Param('website') website: string): Promise<any> {
    return success(await this.tagService.findStudyMonitorUserTagWebsitesPagesData(req.user.userId, tag, website));
  }
}