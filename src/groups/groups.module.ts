import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/entities/Group';
import { User } from 'src/entities/User';
import { UsersService } from 'src/users/users.service';

@Module({
    controllers: [GroupsController],
    imports: [TypeOrmModule.forFeature([Group, User])],
    providers: [GroupsService, UsersService],
    exports: []
})
export class GroupsModule {}
