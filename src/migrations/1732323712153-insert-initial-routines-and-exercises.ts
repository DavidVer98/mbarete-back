import { MigrationInterface, QueryRunner } from 'typeorm'

export class InsertInitialRoutinesAndExercises1732323712153 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Insertar datos en tbl_muscle_groups
    await queryRunner.query(`
        INSERT INTO tbl_muscle_groups ("createdAt", "updatedAt", name, description, "bodyPart", frequency, level)
        VALUES 
          (NOW(), NOW(), 'Pecho', 'Fortalece y define los músculos del pecho.', 'CHEST', 'WEEKLY', 'BEGINNER'),
          (NOW(), NOW(), 'Espalda', 'Ejercicios para fortalecer la espalda y mejorar la postura.', 'BACK', 'TWICE_WEEK', 'INTERMEDIATE'),
          (NOW(), NOW(), 'Piernas', 'Entrenamiento para el desarrollo muscular de las piernas.', 'LEGS', 'THREE_TIMES_WEEK', 'ADVANCED'),
          (NOW(), NOW(), 'Brazos', 'Define y tonifica los bíceps y tríceps.', 'BICEPS', 'DAILY', 'EXPERT'),
          (NOW(), NOW(), 'Abdomen', 'Ejercicios para fortalecer el core y definir el abdomen.', 'ABS', 'WEEKLY', 'BEGINNER');
      `)

    // Insertar datos en tbl_exercises
    await queryRunner.query(`
        INSERT INTO tbl_exercises ("createdAt", "updatedAt", name, description, "videoUrl", "imageUrl", difficulty)
        VALUES 
          (NOW(), NOW(), 'Press de banca', 'Ejercicio básico para el desarrollo del pecho.', 'https://example.com/video/press-banca', 'https://example.com/image/press-banca.jpg', 'MEDIUM'),
          (NOW(), NOW(), 'Dominadas', 'Fortalece los músculos dorsales y bíceps.', 'https://example.com/video/dominadas', 'https://example.com/image/dominadas.jpg', 'HARD'),
          (NOW(), NOW(), 'Sentadilla', 'Ejercicio compuesto para las piernas y glúteos.', 'https://example.com/video/sentadilla', 'https://example.com/image/sentadilla.jpg', 'HARD'),
          (NOW(), NOW(), 'Plancha', 'Fortalece el core y mejora la estabilidad.', 'https://example.com/video/plancha', 'https://example.com/image/plancha.jpg', 'EASY'),
          (NOW(), NOW(), 'Flexiones de brazos', 'Ejercicio clásico para pecho y tríceps.', 'https://example.com/video/flexiones', 'https://example.com/image/flexiones.jpg', 'MEDIUM');
      `)

    // Insertar datos en tbl_routine_exercises
    await queryRunner.query(`
        INSERT INTO tbl_routine_exercises ("createdAt", "updatedAt", sets, reps, weight, "restTime", notes, "exerciseId", "routineDayId")
        VALUES 
          (NOW(), NOW(), 4, 12, 70, 90, 'Aumentar peso progresivamente.', (SELECT id FROM tbl_exercises WHERE name = 'Press de banca'), null),
          (NOW(), NOW(), 3, 10, null, 120, 'Mantener buena técnica en cada repetición.', (SELECT id FROM tbl_exercises WHERE name = 'Dominadas'), null),
          (NOW(), NOW(), 4, 15, 80, 60, 'Enfocarse en la profundidad.', (SELECT id FROM tbl_exercises WHERE name = 'Sentadilla'), null),
          (NOW(), NOW(), 3, 1, null, 30, 'Mantener durante 60 segundos.', (SELECT id FROM tbl_exercises WHERE name = 'Plancha'), null),
          (NOW(), NOW(), 3, 20, null, 60, 'Realizar de forma controlada.', (SELECT id FROM tbl_exercises WHERE name = 'Flexiones de brazos'), null);
      `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Eliminar datos de tbl_routine_exercises
    await queryRunner.query(`
        DELETE FROM tbl_routine_exercises WHERE "exerciseId" IN (
          SELECT id FROM tbl_exercises WHERE name IN ('Press de banca', 'Dominadas', 'Sentadilla', 'Plancha', 'Flexiones de brazos')
        );
      `)

    // Eliminar datos de tbl_exercises
    await queryRunner.query(`
        DELETE FROM tbl_exercises WHERE name IN ('Press de banca', 'Dominadas', 'Sentadilla', 'Plancha', 'Flexiones de brazos');
      `)

    // Eliminar datos de tbl_muscle_groups
    await queryRunner.query(`
        DELETE FROM tbl_muscle_groups WHERE name IN ('Pecho', 'Espalda', 'Piernas', 'Brazos', 'Abdomen');
      `)
  }
}
