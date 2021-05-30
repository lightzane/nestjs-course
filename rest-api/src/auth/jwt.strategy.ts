import { Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// see also https://github.com/lightzane/learn-nestjs-passport
export class JwtStrategy extends PassportStrategy(Strategy) {
    // You need to provide this in a module (i.e. auth.module.ts) so that nestjs will know it
    constructor() {
        // the super for Strategy from 'passport-jwt'
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET_KEY,
            ignoreExpiration: false,
        });
    }

    // to see options or intelisense for super()
    // type a temporary line of code:
    // new Strategy({ <options here> })

    private readonly logger = new Logger('JwtStrategy', true);

    /**
     * #### For the jwt-strategy,
     * Passport first verifies the JWT's signature and decodes the JSON. It then invokes our `validate()` method passing the decoded JSON as its single parameter. Based on the way JWT signing works, we're guaranteed that we're receiving a valid token that we have previously signed and issued to a valid user.
     *
     * Source: https://docs.nestjs.com/security/authentication#implementing-passport-jwt
     * @param payload - the decoded JSON
     * @returns
     */
    async validate(payload: any) {
        this.logger.log('Validating payload');
        return payload;
    }
}
