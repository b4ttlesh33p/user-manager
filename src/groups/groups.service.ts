import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/entities/Group';
import { User } from 'src/entities/User';
import { GroupStatus } from 'src/entities/types/enums';
import { Repository } from 'typeorm';

@Injectable()
export class GroupsService {
    constructor(
        @InjectRepository(Group)
        private groupService: Repository<Group>,
        @InjectRepository(User)
        private userService: Repository<User>){
    }

    async createGroup() {
        return await this.groupService.save({})
    }

    async getGroupById(id: number) {
        return await this.groupService.findOne({where: {id}})
    }

    async addUserToGroup({userId, groupId}: {userId: number, groupId: number}) {
        const user = await this.userService.findOne({where: {id: userId}})
        const group = await this.groupService.findOne({where: {id: groupId}})

        if (!user || !group) {
            return null
        }

        await this.userService.update(user, { groups: [...user.groups, group]})
        await this.groupService.update(group, { status: GroupStatus.NOT_EMPTY})
    }

    async removeUserFromGroup({userId, groupId}: {userId: number, groupId: number}) {
        const user = await this.userService.findOne({where: {id: userId}})
        const group = await this.groupService.findOne({where: {id: groupId}})

        if (!user || !group) {
            return null
        }

        await this.userService.update(user, { groups: user.groups.filter(userGroup => userGroup !==  group)})
        if (!group.users.length) {
            await this.groupService.update(group, { status: GroupStatus.EMPTY})
        }
    }
}
