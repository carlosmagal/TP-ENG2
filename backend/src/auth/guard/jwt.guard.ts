import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

async function manualJwtExtraction(
  context: ExecutionContext,
  config: ConfigService,
  jwt: JwtService,
  prisma: PrismaService,
): Promise<boolean> {
  const req = context.switchToHttp().getRequest();
  const authHeader: string = req.headers.authorization;
  const token = extractTokenFromAuthHeader(authHeader);
  const jwtSecret = config.get('JWT_SECRET');
  try {
    const payload: {
      sub: string;
      email: string;
    } = jwt.verify(token, {
      secret: jwtSecret,
    });
    const userData = await getUserDataById(payload.sub, prisma);

    if (!userData) return false;
    req.user = userData;
    return true;
  } catch (error) {
    return false;
  }
}

function extractTokenFromAuthHeader(authHeader: string): string | null {
  const bearerPrefix = 'Bearer ';

  if (authHeader && authHeader.startsWith(bearerPrefix)) {
    return authHeader.substring(bearerPrefix.length);
  }

  return null;
}


async function getUserDataById(userId: string, prisma: PrismaService) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

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

  canActivate(context: ExecutionContext) {
    return manualJwtExtraction(context, this.config, this.jwt, this.prisma);
  }
}
