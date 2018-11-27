import { HttpException } from "@nestjs/common";

export class LoginInvalid extends HttpException {
    constructor(){
        super('Email ou Senha Inválida', 504);
    }
}