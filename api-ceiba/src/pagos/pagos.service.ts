import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagos } from './entities';
import { CreatePagosDto } from './dtos';
import { isMatch } from 'date-fns';
import { errorHandler, successResponseMessage } from '../helpers';
import { getOneQueryWhereOne, updateOnePay } from './queries';

@Injectable()
export class PagosService {
  constructor(
    @InjectRepository(Pagos)
    private readonly postRepository: Repository<Pagos>,
  ) {}

  async getMany() {
    const pagos = await this.postRepository.find();
    return pagos;
  }

  async createOne(dto: CreatePagosDto) {
    /*Date string validation*/
    const resultCmp = isMatch(dto.fechaPago, 'dd/MM/yyyy');
    if (!resultCmp) {
      errorHandler(400, 'Formato de fecha incorrecto');
    }

    if (resultCmp) {
      const day = Number(dto.fechaPago.slice(0, 2));
      if (day % 2 == 0) {
        errorHandler(
          400,
          'lo siento pero no se puede recibir el pago por decreto de administración',
        );
      }
    }

    /*Find user in db ? update user: create user*/
    const user = await getOneQueryWhereOne(
      this.postRepository,
      'pagos',
      dto.documentoIdentificacionArrendatario,
      dto.codigoInmueble,
    );

    console.log('antes', user);
    if (user) {
      /*exists update*/
      await updateOnePay(
        this.postRepository,
        dto.valorPagado,
        user.valorPagado,
        dto.documentoIdentificacionArrendatario,
        dto.codigoInmueble,
      );
      return user.valorPagado === 1000000 && dto.valorPagado === 1000000
        ? successResponseMessage.respuesta1(0)
        : successResponseMessage.respuesta2(user.valorPagado - dto.valorPagado);
    }

    const newTotal = 1000000 - dto.valorPagado;
    const pago = this.postRepository.create({ ...dto, valorPagado: newTotal });
    const pago_saved = await this.postRepository.save(pago);
    return pago_saved.valorPagado === 0
      ? successResponseMessage.respuesta1(0)
      : successResponseMessage.respuesta2(newTotal);
  }
}
