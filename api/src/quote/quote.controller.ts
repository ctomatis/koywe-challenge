import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { FetchHttpAdapter } from './adapter/http';

@Controller('quote')
export class QuoteController {
  constructor(
    private readonly quoteService: QuoteService,
    private readonly http: FetchHttpAdapter,
  ) { }

  @Post()
  async create(@Res() resp, @Body() createQuoteDto: CreateQuoteDto) {
    let rate: number = 0
    try {
      const price = await this.http.call(createQuoteDto.from, createQuoteDto.to)
      rate = parseFloat(price[createQuoteDto.from].price)
    } catch (err) {
      throw new BadRequestException()
    }

    try {
      createQuoteDto.rate = rate
      const item = await this.quoteService.create(createQuoteDto);

      return resp.status(HttpStatus.CREATED).json({
        statuscode: HttpStatus.CREATED,
        item,
      });

    } catch (err) {
      throw new InternalServerErrorException()
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.quoteService.findOne(id);
  }

  @Get()
  findAll() {
    return this.quoteService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuoteDto: UpdateQuoteDto) {
    return this.quoteService.update(id, updateQuoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quoteService.remove(id);
  }
}
