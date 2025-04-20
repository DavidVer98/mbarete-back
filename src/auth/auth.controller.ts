import { Controller, Post, UseGuards, Body } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { AuthService } from './auth.service'
import { AuthUser } from './dto/auth-user.dto'
import { LoginDto } from './dto/login.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ jwt: string; user: AuthUser }> {
    return this.authService.login(loginDto.email, loginDto.password)
  }
}
