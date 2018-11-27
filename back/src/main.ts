import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "reflect-metadata";
import {createConnection} from "typeorm";
import { Usuario } from 'entity/usuario.entity';
import { Profissao } from 'entity/profissao.entity';
import { Respostas } from 'entity/respostas.entity';
import { Beneficio } from 'entity/beneficios.entity';
import { BeneficioResposta } from 'entity/beneficio-resposta.entity';
const cors = require('cors');

createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "190895",
    database: "survey1",
    entities: [
      Profissao,
      Respostas,
      Usuario,
      Beneficio,
      BeneficioResposta,
    ],
    synchronize: true,
    logging: true
}).then(connection => {
}).catch(error => console.log(error));

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors())
  await app.listen(3000);
}
bootstrap();
