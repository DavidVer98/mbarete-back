import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email)
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(email: string, password: string) {
    const user = await this.usersService.getByEmail(email)
    const validUser = await this.validateUser(email, password)
    if (!validUser) {
      throw new UnauthorizedException()
    }
    const payload = {
      email: user.email,
      userId: user.id,
      sub: user.id,
    }
    return {
      jwt: this.jwtService.sign(payload),
      user: {
        email: user.email,
        id: user.id,
      },
    }
  }
}
