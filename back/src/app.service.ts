import { Injectable } from '@nestjs/common';
import { Usuario } from 'entity/usuario.entity';
import { LoginInvalid } from 'expection';
import { Profissao } from 'entity/profissao.entity';
import { Respostas } from 'entity/respostas.entity';
import { Beneficio } from 'entity/beneficios.entity';
import { BeneficioResposta } from 'entity/beneficio-resposta.entity';

@Injectable()
export class AppService {
  async login(email: string, password: string): Promise<Usuario> {
    const usuario = await Usuario.findOne({
      where: {
        email: email,
        password: password,
      }
    })
    if(!usuario) {
      throw new LoginInvalid();
    }

    return usuario;
  }

  async novoUsuario(email: string, password: string, profissao: number, uf: number, municipio: number): Promise<number> {
    const usuario = new Usuario()
    usuario.email = email;
    usuario.password = password;
    usuario.profissao_fk = await Profissao.findOne({
      where: {
        id: profissao,
      }
    })
    await usuario.save();
    return usuario.id;
  }

  async novaProfissao(cbo: string, nome: string) {
    const profissao = new Profissao();
    profissao.cbo = cbo;
    profissao.nome = nome;
    await profissao.save();
    return profissao.id;
  }

  async getProfissao(): Promise<Profissao[]> {
    return Profissao.find();
  }

  async getOneProfissao(cboFind: string) {
    return await Profissao.findOne({
      where: {
        cbo: cboFind,
      }
    })
  }

  async getBeneficios(): Promise<Beneficio[]> {
    return Beneficio.find().then( data => {
      const result = [];
      const at = { ativo: false};
      data.map( elem => {
        result.push( {...elem, ...at });
      })
      return result;
    })
  }

  async salvarResposta(salario: number, prof: string, profNome: string, beneficios: any[]) {
    let profissao = await Profissao.findOne({
      where: {
        cbo: prof,
      }
    });

    if (!profissao) {
      profissao = new Profissao();
      profissao.cbo = prof;
      profissao.nome = profNome;
      await profissao.save();
    }

    const resposta = new Respostas();
    resposta.salario = salario;
    resposta.profissao_fk = profissao;
    await resposta.save();

    if (beneficios && beneficios.length) {
      beneficios.forEach( async bn => {
        let beneficio = await Beneficio.findOne({
          where: {
            id: bn.id,
          }
        });

        if (!beneficio) {
          beneficio = new Beneficio();
          beneficio.nome = bn.nome;
          await beneficio.save();
        }
        if (bn.ativo) {
          let beneficioResposta = new BeneficioResposta();
          beneficioResposta.beneficio_fk = beneficio;
          beneficioResposta.resposta_fk = resposta;
          beneficioResposta.save();
        }
      });
    }
  }

  async consulta(profissaoID: number): Promise<Respostas[]> {
    return Respostas.createQueryBuilder('respostas')
    .innerJoinAndSelect('respostas.ramoAtividade_fk', 'ramo_ativ')
    .innerJoinAndSelect('respostas.numeroFunc_fk', 'num_func')
    .innerJoinAndSelect('respostas.tempoCasa_fk', 'tempo_casa')
    .innerJoinAndSelect('respostas.profissao_fk', 'profissao')
    .where('profissao.id = :id', { id: profissaoID})
    .getMany();
  }
}
