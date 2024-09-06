import { UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';

// Mock AbstractController
export abstract class MockAbstractController {
    protected url: string;
    protected route: string;

    constructor(protected readonly request: Request) {
        this.url = 'http://localhost/mock-url';
        this.route = '/mock-url';
    }
}

// Apply UseInterceptors decorator to the mock class
UseInterceptors(ClassSerializerInterceptor)(MockAbstractController);

export const mockRequest = {
    protocol: 'http',
    get: jest.fn((headerName: string) => {
        // Mock behavior for the 'host' header
        if (headerName === 'host') {
            return 'localhost';
        }
        // Add more mock behavior for other headers if needed
        return '';
    }),
    originalUrl: '/mock-url',
} as unknown as Request;
