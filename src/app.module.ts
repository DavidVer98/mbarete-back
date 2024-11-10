import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from './auth/auth.module'
import { BoardsModule } from './boards/boards.module'
import { DiagramsModule } from './diagrams/diagrams.module'
import { ExercisesModule } from './exercises/exercises.module'
import { FoldersModule } from './folders/folders.module'
import { GoalsModule } from './goals/goals.module'
import { RoutinesModule } from './routines/routines.module'
import { UsersController } from './users/users.controller'
import { UsersModule } from './users/users.module'
import { WorkoutSessionsModule } from './workout-sessions/workout-sessions.module'

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
    RoutinesModule,
    ExercisesModule,
    GoalsModule,
    WorkoutSessionsModule,
  ],
  controllers: [UsersController],
})
export class AppModule {}
