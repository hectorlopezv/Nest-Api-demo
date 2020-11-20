import { Test, TestingModule } from '@nestjs/testing';
import { PagosController } from './pagos.controller';
import { PagosService } from './pagos.service';

describe('PagosController', () => {
  let controller: PagosController;
  let service: PagosService;

  beforeEach(async () => {
    /*Execute before each test*/
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagosController],
      providers: [PagosService],
    }).compile();

    service = module.get<PagosService>(PagosService);
    controller = module.get<PagosController>(PagosController);
  });

  describe('getMany', () => {
    it('should return an array of Payment Objects', async () => {
      const result = [
        {
          documentoIdentificacionArrendatario: 121111112,
          codigoInmueble: 'laura',
          valorPagado: 0,
          fechaPago: '23/01/2010',
        },
        {
          documentoIdentificacionArrendatario: 121111112,
          codigoInmueble: 'lauraaaaaaaaaaaaa',
          valorPagado: 997000,
          fechaPago: '23/01/2010',
        },
        {
          documentoIdentificacionArrendatario: 121111112,
          codigoInmueble: 'laurall2sal',
          valorPagado: -4000000,
          fechaPago: '21/01/2010',
        },
        {
          documentoIdentificacionArrendatario: 121111112,
          codigoInmueble: 'lauralll',
          valorPagado: 1000000,
          fechaPago: '23/01/2010',
        },
      ];
      jest
        .spyOn(service, 'getMany')
        .mockImplementation(async () => await result);

      expect(await controller.getMany()).toBe(result);
    });
  });
});
