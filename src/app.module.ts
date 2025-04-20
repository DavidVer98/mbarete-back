import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from './auth/auth.module'
import { BoardsModule } from './boards/boards.module'
import { DiagramsModule } from './diagrams/diagrams.module'
import { ExerciseController } from './exercises/controllers/exercise/exercise.controller'
import { ExercisesModule } from './exercises/exercises.module'
import { FoldersModule } from './folders/folders.module'
import { GoalsModule } from './goals/goals.module'
import { UsersController } from './users/users.controller'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: configService.get('NODE_ENV') === 'development',
        ssl: {
          rejectUnauthorized: false, // Necessary for Supabase connections
        },
        migrationsRun: true,
        migrations: [`${__dirname}/migrations/*{.ts,.js}`],
        // logging: true, // Añade esta línea
        // logger: 'advanced-console', // Y esta
      }),
      inject: [ConfigService],
    }),
    DiagramsModule,
    UsersModule,
    BoardsModule,
    AuthModule,
    FoldersModule,
    GoalsModule,
    ExercisesModule,
  ],
  controllers: [UsersController, ExerciseController, ExerciseController],
})
export class AppModule {}
