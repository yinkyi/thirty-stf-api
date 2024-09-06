import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ClassConstructor {
  new (...args: any[]): object;
}

export function Serialize(
  dto: ClassConstructor,
  options?: { skipInstanceToPlain?: boolean },
) {
  return UseInterceptors(new SerializeInterceptor(dto, options));
}

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(
    private readonly dto: any,
    private readonly options?: { skipInstanceToPlain?: boolean },
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const transformedItems = plainToInstance(this.dto, data.items ?? data, {
          excludeExtraneousValues: true,
          enableImplicitConversion: true,
        });

        const plainData = instanceToPlain(transformedItems, {
          excludeExtraneousValues: true,
        });

        return {
          ...data,
          items: plainData,
        };
      }),
    );
  }
}
