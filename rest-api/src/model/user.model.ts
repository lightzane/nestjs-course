import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';

export class User {
    @ApiProperty({ type: String })
    @prop()
    email: string;

    @ApiProperty({ type: [String] })
    @prop()
    roles: string[];

    @ApiProperty({ type: String })
    @prop()
    passwordHash: string;
}
