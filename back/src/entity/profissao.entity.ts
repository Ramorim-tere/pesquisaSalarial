import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm'
import { Usuario } from './usuario.entity';
import { Respostas } from './respostas.entity';

@Entity('profissao')
export class Profissao extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 6,
        unique: true,
    })
    cbo: string;

    @Column({
        type: 'text',
    })
    nome: string;

    @OneToMany(type => Usuario, usuario => usuario.profissao_fk)
    @JoinColumn({ name: 'usuarios_fk', referencedColumnName: 'id'})
    usuarios_fk: Usuario[];

    @OneToMany(type => Respostas, respostas => respostas.profissao_fk)
    @JoinColumn({ name: 'respostas', referencedColumnName: 'id'})
    respostas: Respostas[];
}