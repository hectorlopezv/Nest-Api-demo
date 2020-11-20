
import { Pagos } from '../entities';

export const getOneQueryWhereOne = (
  repository,
  TableName: string,
  documentoIdentificacionArrendatario: number,
  codigoInmueble: string,
) => {
  return repository
    .createQueryBuilder(TableName)
    .where('pagos.documentoIdentificacionArrendatario = :firstName', {
      firstName: `${documentoIdentificacionArrendatario}`,
    })
    .andWhere('pagos.codigoInmueble = :lastName', {
      lastName: `${codigoInmueble}`,
    })
    .getOne();
};

export const updateOnePay = (
  repository: any,
  newPay:number,
  oldPay:number,
  documentoIdentificacionArrendatario: number,
  codigoInmueble: string,
) => {
  return repository
  .createQueryBuilder()
  .update(Pagos)
  .set({ valorPagado: Number(`${oldPay - newPay}`) })
  .where('pagos.documentoIdentificacionArrendatario = :firstName', {
    firstName: Number(`${documentoIdentificacionArrendatario}`),
  })
  .andWhere('pagos.codigoInmueble = :lastName', {
    lastName: `${codigoInmueble}`,
  })
  .execute();
};
