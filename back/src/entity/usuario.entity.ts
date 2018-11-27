import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Profissao } from './profissao.entity';
import { Respostas } from './respostas.entity';

@Entity('usuario')
export class Usuario extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'text',
        unique: true,
    })
    email: string;

    @Column({
        type: 'text',
    })
    password: string;

    @Column({
        type: 'bigint',
        default: 0,
    })
    repostas: number;

    @ManyToOne(type => Profissao, profissao => profissao.usuarios_fk)
    @JoinColumn({ name: 'profissao_fk', referencedColumnName: 'id'})
    profissao_fk: Profissao;

}