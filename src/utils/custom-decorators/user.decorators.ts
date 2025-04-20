// eslint-disable-next-line filenames/match-regex
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { AuthUser } from '../../auth/dto/auth-user.dto'

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext): AuthUser => {
  const request = ctx.switchToHttp().getRequest()
  return request.user
})
