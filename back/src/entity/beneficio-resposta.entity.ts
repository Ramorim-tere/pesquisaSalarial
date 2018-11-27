import { BaseEntity, PrimaryColumn, Entity, ManyToMany, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Respostas } from "./respostas.entity";
import { JoinAttribute } from "typeorm/query-builder/JoinAttribute";
import { Beneficio } from "./beneficios.entity";

@Entity('beneficio_resposta')
export class BeneficioResposta extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(type => Respostas, respostas => respostas.beneficio_resposta)
    @JoinColumn({ name: 'resposta_fk', referencedColumnName: 'id'})
    resposta_fk: Respostas;

    @ManyToOne(type => Beneficio, beneficio => beneficio.beneficio_resposta)
    @JoinColumn({ name: 'beneficio_fk', referencedColumnName: 'id'})
    beneficio_fk: Beneficio;

}