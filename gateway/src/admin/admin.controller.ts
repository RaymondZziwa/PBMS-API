import {
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
//import { BearerTokenExtractor } from 'src/middleware/tokenExtractor.middleware';

@Controller('api/v1/')
//@UseInterceptors(BearerTokenExtractor)
export class AdminController {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
  ) {}

  //marketting
  @Post('/send-marketting-email')
  sendMarkettingEmail(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'SEND_MARKETTING_EMAIL' }, req.body);
  }

  @Get('/get-marketting-emails')
  getAllMarkettingEmails(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_ALL_MARKETTING_EMAILS' }, req.body);
  }

  //meetings
  @Post('/schedule-meeting')
  saveNewMeeting(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'SAVE_NEW_MEETING' }, req.body);
  }

  @Post('/update-meeting')
  updateMeetingData(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'UPDATE_MEETING_DATA' }, req.body);
  }

  @Post('/delete-meeting')
  deleteMeetingData(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'DELETE_MEETING_DATA' }, req.body);
  }

  @Get('/get-meetings')
  getAllMeetings(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_MEETINGS_DATA' }, req.body);
  }

  //events
  @Post('/schedule-event')
  saveNewEvent(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'SAVE_NEW_EVENT' }, req.body);
  }

  @Post('/update-event')
  updateEventData(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'UPDATE_EVENT' }, req.body);
  }

  @Post('/delete-event')
  deleteEventData(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'DELETE_EVENT_DATA' }, req.body);
  }

  @Get('/get-events')
  getAllEvents(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_ALL_EVENTS' }, req.body);
  }
  //directories
  @Post('/create-new-directory')
  saveNewDirectory(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'CREATE_NEW_DIRECTORY' }, req.body);
  }

  @Post('/update-directory')
  updateDirectory(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'UPDATE_DIRECTORY' }, req.body);
  }

  @Post('/delete-directory')
  deleteDirectory(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'DELETE_DIRECTORY' }, req.body);
  }

  @Get('/get-all-directories')
  getAllDirectories(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_ALL_DIRECTORIES' }, req.body);
  }
  //docs
  @Post('/upload-document')
  @UseInterceptors(FileInterceptor('file'))
  uploadDocument(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    if (file) {
      return this.natsClient.send({ cmd: 'UPLOAD_DOC' }, req.body);
    } else {
      return {
        statusCode: 400,
        message: 'No file uploaded',
        data: null,
      };
    }
  }

  @Post('/update-document')
  updateDocument(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'UPDATE_DOC' }, req.body);
  }

  @Post('/delete-document')
  deleteDocument(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'DELETE_DOC' }, req.body);
  }

  @Get('/get-all-documents')
  getAllDocuments(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_ALL_DOCS' }, req.body);
  }

  @Get('/get-directory-documents')
  getDirectoryDocuments(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'GET_DIRECTORY_DOCS' }, req.body);
  }

  @Post('/download-document')
  downloadDocument(@Req() req: Request) {
    return this.natsClient.send({ cmd: 'DOWNLOAD_DOC' }, req.body);
  }
}
