import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Role } from "./role.enum";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/common/decorators/roles.decorator";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector,
        private readonly jwtService: JwtService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);

        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        request.user= await this.jwtService.verifyAsync(
            request.headers.authorization.split(" ")[1],{secret: process.env.JWT_SECRET_KEY}); 

        const user = request.user ;
        return user && user.roles && roles.some(role => user.roles.includes(role));
    }
}