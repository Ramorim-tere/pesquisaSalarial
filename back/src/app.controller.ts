import { Get, Controller, Post, Body, Param, Request, Response } from '@nestjs/common';
import { AppService } from './app.service';
import { Usuario } from 'entity/usuario.entity';
import { Profissao } from 'entity/profissao.entity';
import { Respostas } from 'entity/respostas.entity';
import { Beneficio } from 'entity/beneficios.entity';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/auth')
  async login(@Body() playload): Promise<Usuario> {
    return this.appService.login(playload.user, playload.password);
  }

  @Post('/novo/usuario')
  async novoUsuario(@Body() playload) {
    return this.appService.novoUsuario(
      playload.email,
      playload.password,
      playload.cbo,
      playload.uf,
      playload.municipio,
    );
  }

  @Post('/novo/profissao')
  async novaProfissao(@Body() playload) {
    return this.appService.novaProfissao(
      playload.cbo,
      playload.nome,
    )
  }

  @Get('/profissao')
  async getProfissao(): Promise<Profissao[]> {
    return this.appService.getProfissao();
  }

  @Get('/beneficios')
  async getBeneficios(): Promise<any[]> {
    return this.appService.getBeneficios();
  }

  @Get('/profissao/:cbo')
  async getOneProfissao(@Param('cbo') cbo: string) {
    return this.appService.getOneProfissao(cbo);
  }

  @Post('/salvarResposta')
  async salvarResposta(@Body() playload) {
    return this.appService.salvarResposta(
      playload.salario,
      playload.prof,
      playload.profNome,
      playload.beneficios
    )
  }
  
  @Get('/consulta/:prof')
  async consulta(@Param('prof') profissao: number): Promise<Respostas[]> {
    return this.appService.consulta(profissao);
  }
}
