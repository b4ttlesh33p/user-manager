import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { UserStatus } from 'src/entities/types/enums';
import { In } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';


export type StatusesToIds =  Record<Partial<UserStatus>, number[]>

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userService: Repository<User>,
    ){}

    async getAll({limit, offset}: {limit: number, offset: number}) {
        return await this.userService.find({ order: { id: "ASC" }, take: limit, skip: offset})
    }

    async getByFilters({limit, offset, filters}) {
        const {name, email} = filters
        const query = this.userService.createQueryBuilder()
            .limit(limit)
            .offset(offset)

        if(name) query.andWhere('name = :name', {name})
        if(email) query.andWhere('email = :email', {email})

        return await query.getMany()
    }

    async updateStatusByIds(statusesToIds: StatusesToIds) {
        Object.keys(statusesToIds).forEach(status => {
            return this.userService.update(
                { id: In(statusesToIds[status]) }, 
                { status: status as UserStatus }
            )
        })
    }

    create({ name, email }: { name: string, email: string }) {
        return this.userService.save({ name, email })
    }

}
