import { Controller, Get, Redirect } from '@nestjs/common';

@Controller()
export class ViewsController {
  @Get()
  @Redirect('https://jeyhunabilov.live', 301)
  redirect(): string {
    return `This action redirects to ${process.env.FRONTEND_URL}`;
  }
}
