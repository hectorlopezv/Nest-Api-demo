import { HttpException } from '@nestjs/common';
export const errorHandler = (erroCode:number, message:string) => {

    throw new HttpException(
        {
            status: erroCode,
            error: message
        },
        erroCode,
        )
}
