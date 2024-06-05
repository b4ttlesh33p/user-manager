import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { GroupsService } from './groups/groups.service';
import { GroupsController } from './groups/groups.controller';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass',
      database: 'usersdb',
      entities: [ 'dist/**/entities/*{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    GroupsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
