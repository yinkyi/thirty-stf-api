import { ThirtySTFlogService } from '@app/thirtystflog/thirtystflog.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [ThirtySTFlogService],
  exports: [ThirtySTFlogService],
})
export class ThirtySTFlogModule {}
