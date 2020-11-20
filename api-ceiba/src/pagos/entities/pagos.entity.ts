import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  PrimaryColumn,
  Unique,
  Index,
} from 'typeorm';

@Entity('pagos')
@Index(['documentoIdentificacionArrendatario', 'codigoInmueble'], {
  unique: true,
})
export class Pagos {
  @PrimaryColumn({ type: 'int', unique: true })
  documentoIdentificacionArrendatario: number;

  @PrimaryColumn({ type: 'varchar', length: 255 ,unique: true  })
  codigoInmueble: string;

  @Column({ type: 'int' })
  valorPagado: number;

  @Column({ type: 'varchar', length: 10 })
  fechaPago: string;
}
