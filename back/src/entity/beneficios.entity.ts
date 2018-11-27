import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import { BeneficioResposta } from "./beneficio-resposta.entity";

@Entity('beneficio')
export class Beneficio extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'text',
    })
    nome: string;

    @OneToMany(type => BeneficioResposta, beneficioResposta => beneficioResposta.beneficio_fk)
    @JoinColumn({ name: 'id', referencedColumnName: 'beneficio_fk'})
    beneficio_resposta: BeneficioResposta[];
}