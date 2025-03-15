import { Injectable, MethodNotAllowedException, NotFoundException } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IQuote } from './interface/quote.interface';

@Injectable()
export class QuoteService {

  constructor(@InjectModel("Quote") private quoteModel: Model<IQuote>) { }

  async create(createQuoteDto: CreateQuoteDto) {
    const res = await new this.quoteModel(createQuoteDto);
    return res.save();
  }

  async findOne(id: string): Promise<IQuote> {
    const res = await this.quoteModel.findById(id).exec();
    if (!res) {
      throw new NotFoundException(`item #${id} not found`);
    }
    return res;
  }

  findAll() {
    throw new MethodNotAllowedException();
  }

  update(id: string, updateQuoteDto: UpdateQuoteDto) {
    throw new MethodNotAllowedException();
  }

  remove(id: string) {
    throw new MethodNotAllowedException();
  }
}
