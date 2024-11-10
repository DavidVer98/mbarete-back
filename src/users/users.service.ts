import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'

import { User } from './users.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } })
  }

  async create(email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = this.usersRepository.create({ email, password: hashedPassword })
    return this.usersRepository.save(user)
  }

  async login(email: string, password: string) {
    const user = await this.findOne(email)
    if (user && (await bcrypt.compare(password, user.password))) {
      return user
    }
    return null
  }
}
