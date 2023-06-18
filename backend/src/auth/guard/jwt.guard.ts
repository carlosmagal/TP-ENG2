import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtGuard implements CanActivate {
  // constructor() {
  //   super();
  // }
  constructor(
    private config: ConfigService,
    private jwt: JwtService,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext) {
    {
      const req = context.switchToHttp().getRequest();
      const authHeader: string = req.headers.authorization;
      const splitHeader = authHeader.split('Bearer ');
      const token = splitHeader[splitHeader.length - 1];
      const jwtSecret = this.config.get('JWT_SECRET');
      try {
        const payload: {
          sub: string;
          email: string;
        } = this.jwt.verify(token, {
          secret: jwtSecret,
        });
        const userData = await this.prisma.user.findUnique({
          where: {
            id: payload.sub,
          },
        });
        req.user = userData;
        return true;
      } catch (e) {
        return false;
      }
    }
  }
}
