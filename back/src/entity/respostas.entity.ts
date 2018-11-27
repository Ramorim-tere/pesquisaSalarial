import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { Profissao } from './profissao.entity';
import { BeneficioResposta } from './beneficio-resposta.entity';
import { Usuario } from './usuario.entity';

@Entity('respostas')
export class Respostas extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'numeric',
    })
    salario: number;

    @ManyToOne(type => Profissao, profissao => profissao.respostas)
    @JoinColumn({ name: 'profissao_fk', referencedColumnName: 'id'})
    profissao_fk: Profissao;

    @OneToMany(type => BeneficioResposta, beneficioResposta => beneficioResposta.resposta_fk)
    @JoinColumn({ name: 'id', referencedColumnName: 'resposta_fk'})
    beneficio_resposta: BeneficioResposta[];
}