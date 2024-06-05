import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { User } from 'src/entities/User';
import { StatusesToIds, UsersService } from './users.service';

@Controller('users')
export class UsersController {
  DEFAULT_GET_ALL_LIMIT = 20
  DEFAULT_GET_ALL_OFFSET = 0
  constructor(private readonly userService: UsersService) {}
  
  @Get()
  async getAll(
    @Query('limit') limit: number = this.DEFAULT_GET_ALL_LIMIT,
    @Query('offset') offset: number = this.DEFAULT_GET_ALL_OFFSET
  ): Promise<User[]> {
    return this.userService.getAll({limit, offset});
  }

  @Get('/name/:name')
  async getByName(
    @Query('limit') limit: number = this.DEFAULT_GET_ALL_LIMIT,
    @Query('offset') offset: number = this.DEFAULT_GET_ALL_OFFSET,
    @Param('name') name: string
  ): Promise<User[]> {
    return this.userService.getByFilters({limit, offset, filters: {name}});
  }

  @Get('/email/:email')
  async getByEmail(
    @Query('limit') limit: number = this.DEFAULT_GET_ALL_LIMIT,
    @Query('offset') offset: number = this.DEFAULT_GET_ALL_OFFSET,
    @Param('email') email: string
  ): Promise<User[]> {
    return this.userService.getByFilters({limit, offset, filters: {email}});
  }

  @Post()
  async create(
    @Body('name') name: string,
    @Body('email') email: string
  ) {
    return this.userService.create({name, email})
  }

  @Put()
  async updateStatusByIds(
    @Body() body: StatusesToIds
  ) {
    return this.userService.updateStatusByIds(body)
  }
}
