import { HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';

export const parseImageFilePipe = new ParseFilePipeBuilder()
    .addFileTypeValidator({
        fileType: /(jpg|jpeg|png)$/,
    })
    .addMaxSizeValidator({
        maxSize: 2097152,
    })
    .build({
        errorHttpStatusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
    });

export const parseVideoFilePipe = new ParseFilePipeBuilder()
    .addFileTypeValidator({
        // Specify the allowed video file types (you can customize this list)
        fileType: /(mp4|m4v|avi|mov|wmv|mkv)$/,
    })
    .addMaxSizeValidator({
        // Set the maximum allowed file size for videos (adjust as needed)
        maxSize: 104857600, // 100 MB in bytes
    })
    .build({
        // Set the HTTP status code for unsupported media type
        errorHttpStatusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
    });

export const parseCsvFilePipe = new ParseFilePipeBuilder()
    .addFileTypeValidator({
        fileType: 'csv',
    })
    .addMaxSizeValidator({
        maxSize: 1048576,
    })
    .build({
        errorHttpStatusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
    });
