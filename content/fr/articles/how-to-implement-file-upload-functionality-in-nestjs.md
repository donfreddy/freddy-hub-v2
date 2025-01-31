---
title: How to Implement File Upload Functionality in NestJS
description: Learn how to easily implement file upload functionality in NestJS, handle various file types, and store them securely.
slug: how-to-implement-file-upload-functionality-in-nestjs
tags: ['NestJS', 'File Upload', 'NodeJS', 'Backend', 'File Handling']
readingTime: 8
published: true
publishedAt: 2025/01/06
updatedAt: 2025/01/06
---

In many backend applications, file upload functionality is a common requirement. Whether you're handling profile pictures, document uploads, or other types of media, being able to handle file uploads efficiently is essential. In this blog post, we'll explore how to implement file upload functionality in NestJS using the powerful `multer` package.

## Prerequisites

Before we begin, you’ll need to have the following:

- **NestJS application set up**: If you haven’t already set up a NestJS project, check out [NestJS documentation](https://docs.nestjs.com/) to get started.
- **Multer**: This is the middleware used for handling `multipart/form-data`, which is commonly used for uploading files.

## Step 1: Install Required Packages

NestJS uses the `@nestjs/platform-express` package to integrate with `multer`. You’ll need to install this package to work with file uploads.

Run the following command to install `@nestjs/platform-express` and `multer`:

```bash
npm install @nestjs/platform-express multer
npm install -D @types/multer
```

## Step 2: Create a File Upload Module

Create a new file upload module with the following structure:

```bash
nest g module file-upload
```

```ts [file-upload.module.ts]{2} meta-info=val
import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';

@Module({
  controllers: [FileUploadController],
  providers: [FileUploadService],
})
export class FileUploadModule {}
```

## Step 3: Create a File Upload Service

In NestJS, you can organize the file upload functionality into a service. This service will handle the logic for storing the uploaded files.

Create a new file upload service with the following structure:

```bash
nest g service file-upload
```

```ts [file-upload.service.ts]{2} meta-info=val
import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path;

@Injectable()
export class FileUploadService {

  constructor() {
    // Create uploads directory if it doesn't exist
    if (!existsSync('./uploads')) {
      mkdirSync('./uploads');
    }
  }

 async saveFile(file: Express.Multer.File): Promise<string> {
    const fileName = `${Date.now()}${extname(file.originalname)}`;
    return fileName;
  }

  getFileUrl(fileName: string): string {
    return `uploads/${fileName}`;
  }
}
```

In this simple service, we have a method called `saveFile()` that generates a unique file name for the uploaded file. You can extend this method to include logic for saving the file to disk or cloud storage. Additionally, the `getFileUrl()` method constructs the URL for accessing the uploaded file.

## Step 4: Create a File Upload Controller

Next, we need a controller to handle HTTP requests for uploading files. In NestJS, the controller is responsible for managing routes and delegating logic to services.

```bash
nest g controller file-upload
```

```ts [file-upload.controller.ts]{2} meta-info=val
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  MaxFileSizeValidator,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('single')
  @UseInterceptors(FileInterceptor('file')) // 'file' is the field name used for the file input
  async uploadSingleFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }), // 5MB
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    try {
      const fileName = await this.fileUploadService.saveFile(file);
      return {
        message: 'File uploaded successfully',
        fileName,
        fileUrl: this.fileUploadService.getFileUrl(fileName),
      };
    } catch (error) {
      throw new BadRequestException('Failed to upload file');
    }
  }
}
```

Here’s what happens in this controller:

- The **`@Post('single')`** decorator creates a POST endpoint at `/file-upload/single`.
- The **`@UseInterceptors(FileInterceptor('file'))`** decorator is used to handle the file upload and associate it with the file field in the request.
- The **`@UploadedFile()`** decorator allows us to access the uploaded file in the controller method.
  - **`ParseFilePipe`**: Validates the file using `MaxFileSizeValidator` (max 5MB) and **`FileTypeValidator`** (only `.png`, `.jpeg`, `.jpg`).

## Step 5: Configure Multer Options (Optional)

By default, `multer` uses some sensible options for storing files, but you can customize these options to suit your needs. For example, you can limit the file size, file types, or specify a custom storage location.

To customize the multer settings, modify the controller like this:

```ts [file-upload.controller.ts]{2} meta-info=val
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileUploadService } from './file-upload.service';
import { extname } from 'path';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('single')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Define the directory to save the files
        filename: (req, file, callback) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          callback(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB size limit
    }),
  )
  async uploadSingleFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }), // 5MB
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    try {
      const fileName = await this.fileUploadService.saveFile(file);
      return {
        message: 'File uploaded successfully',
        fileName,
        fileUrl: this.fileUploadService.getFileUrl(fileName),
      };
    } catch (error) {
      throw new BadRequestException('Failed to upload file');
    }
  }
}
```

In this configuration:

- The `diskStorage()` function allows us to specify the file destination and filename format.
- The `fileFilter()` function is used to restrict the types of files that can be uploaded.
- The `limits` option is used to specify the maximum file size (5 MB in this case).

## Step 5: Handle Multiple File Uploads (Optional)

If you need to handle multiple file uploads at once, you can use the FilesInterceptor from NestJS.

```ts [file-upload.controller.ts]{2} meta-info=val
import {
  Controller,
  Post,
  UseInterceptors,
  BadRequestException,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileUploadService } from './file-upload.service';
import { extname } from 'path';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB size limit
    }),
  )
  async uploadMultipleFiles(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }), // 5MB
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    files: Express.Multer.File[],
  ) {
    try {
      const uploadedFiles = await Promise.all(
        files.map(async (file) => {
          const fileName = await this.fileUploadService.saveFile(file);
          return {
            fileName,
            fileUrl: this.fileUploadService.getFileUrl(fileName),
          };
        }),
      );

      return {
        message: 'Files uploaded successfully',
        files: uploadedFiles,
      };
    } catch (error) {
      throw new BadRequestException('Failed to upload files');
    }
  }
}
```

Here, the FilesInterceptor is used to handle multiple files, and the @UploadedFiles() decorator allows us to access the array of uploaded files.

## Step 6: Serve Uploaded Files (Optional)

If you want to serve the uploaded files back to the client, you need to set up static file serving in your application.

In the main `app.module.ts`, add the following configuration to serve static files from the `uploads` directory:

```ts
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FileUploadModule } from './file-upload/file-upload.module';

@Module({
  imports: [
    FileUploadModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
  ],
})
export class AppModule {}
```

This will make the files in the `uploads` directory accessible through URLs like `http://localhost:3000/uploads/your-file.jpg`

## Step 7: Implementing Error Handling (Optional)

To handle errors during file upload, you can create a custom exception filter. This filter will catch exceptions thrown by NestJS and `multer`, and return appropriate error messages to the client.

Create a new file `file-upload-exception.filter.ts` with the following content:

```ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { MulterError } from 'multer';

@Catch(HttpException, MulterError)
export class FileUploadExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | MulterError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = 500;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    } else if (exception instanceof MulterError) {
      status = 400;
      message = this.getMulterErrorMessage(exception);
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }

  private getMulterErrorMessage(error: MulterError): string {
    switch (error.code) {
      case 'LIMIT_FILE_SIZE':
        return 'File size exceeds the allowed limit';
      case 'LIMIT_FILE_COUNT':
        return 'Too many files uploaded';
      case 'LIMIT_UNEXPECTED_FILE':
        return 'Unexpected field name in request';
      default:
        return 'File upload error';
    }
  }
}
```

To use this filter, apply it to your controller or globally in your application. For example, to apply it globally, update your `main.ts` file:

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FileUploadExceptionFilter } from './file-upload/file-upload-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new FileUploadExceptionFilter());
  await app.listen(3000);
}
bootstrap();
```

This will ensure that any errors during file upload are properly handled and returned to the client with meaningful messages.

## Step 8: Test the File Upload

To test the file upload functionality, you can use tools like Postman or Insomnia. Send a POST request to `http://localhost:3000/upload/single` (for a single file) or `http://localhost:3000/upload/multiple` (for multiple files) and include a file in the request body.

Example Request (for Postman):

- **Method**: POST
- **URL**: `http://localhost:3000/file-upload/single`
- **Body**: Form-data, key: `file`, value: (choose file)

## Conclusion

Implementing file upload functionality in NestJS is straightforward with the help of `multer` and the `@nestjs/platform-express` package. We have covered uploading a single file, handling multiple files, and customizing file storage options. Additionally, we showed how to serve uploaded files back to the client. This setup can be further extended to integrate cloud storage solutions or more complex file handling logic based on your project needs.
