import { Request } from 'express';

// @UseInterceptors(ClassSerializerInterceptor)
export abstract class AbstractController {
    // Store the full URL
    protected url: string;

    // Store only the route
    protected route: string;

    constructor(protected readonly request: Request) {
        this.url =
            this.request.protocol +
            '://' +
            this.request.get('host') +
            this.request.originalUrl;
        this.route = this.request.originalUrl;
    }
}
