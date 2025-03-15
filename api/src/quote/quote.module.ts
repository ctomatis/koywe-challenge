import { Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { QuoteSchema } from './schema/quote.schema';
import { FetchHttpAdapter } from './adapter/http';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Quote', schema: QuoteSchema }])
  ],
  controllers: [QuoteController],
  providers: [QuoteService, FetchHttpAdapter],
})
export class QuoteModule { }
