import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitialExercises1733095954577 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO tbl_exercises (name, description, "muscleGroupId", "createdAt", "updatedAt")
      VALUES
        -- Pecho
        ('Press de banca', 'Trabaja el pecho mayor, los tríceps y los hombros para aumentar la fuerza y la masa muscular.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Pecho'), NOW(), NOW()),
        ('Press inclinado', 'Se enfoca en la parte superior del pecho, desarrollando el área clavicular.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Pecho'), NOW(), NOW()),
        ('Press declinado', 'Enfocado en la parte inferior del pecho para un desarrollo completo.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Pecho'), NOW(), NOW()),
        ('Aperturas con mancuernas', 'Mejora la flexibilidad y el volumen del pecho.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Pecho'), NOW(), NOW()),
        ('Fondos en paralelas', 'Combina el trabajo del pecho, tríceps y deltoides frontales.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Pecho'), NOW(), NOW()),
        ('Crossover en polea', 'Definición y trabajo del pecho interno mediante un rango de movimiento amplio.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Pecho'), NOW(), NOW()),
        ('Push Ups', 'Fortalece el pecho con un enfoque en resistencia y control corporal.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Pecho'), NOW(), NOW()),
        ('Press con mancuernas', 'Permite un rango de movimiento amplio para trabajar el pecho de forma equilibrada.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Pecho'), NOW(), NOW()),
        ('Press en máquina', 'Proporciona estabilidad para principiantes y permite el aislamiento del pecho.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Pecho'), NOW(), NOW()),
        ('Pullover con mancuerna', 'Estira y expande el pecho mientras activa los dorsales.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Pecho'), NOW(), NOW()),

        -- Espalda
        ('Dominadas', 'Desarrolla la fuerza en la espalda alta y los bíceps mediante la tracción corporal.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Espalda'), NOW(), NOW()),
        ('Remo con barra', 'Aumenta la densidad muscular en la espalda media y baja.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Espalda'), NOW(), NOW()),
        ('Remo con mancuerna', 'Se enfoca en la parte alta y media de la espalda con un rango de movimiento completo.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Espalda'), NOW(), NOW()),
        ('Pull Over', 'Activa la espalda mientras estira los músculos del torso.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Espalda'), NOW(), NOW()),
        ('Peso muerto', 'Fortalece la espalda baja y mejora la postura general.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Espalda'), NOW(), NOW()),
        ('Remo invertido', 'Trabajo intenso en los músculos dorsales y trapecios.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Espalda'), NOW(), NOW()),
        ('Lat Pulldown', 'Permite entrenar los dorsales con mayor control en máquinas.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Espalda'), NOW(), NOW()),
        ('Remo en polea baja', 'Aumenta el grosor de la espalda mientras estabiliza el tronco.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Espalda'), NOW(), NOW()),
        ('Hiperextensiones', 'Fortalece los erectores de la columna y previene lesiones.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Espalda'), NOW(), NOW()),
        ('Chin Ups', 'Similar a las dominadas, pero con mayor énfasis en los bíceps y dorsales.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Espalda'), NOW(), NOW()),

        -- Piernas
        ('Sentadillas', 'Activa los cuádriceps, glúteos e isquiotibiales, fortaleciendo toda la parte inferior del cuerpo.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Piernas'), NOW(), NOW()),
        ('Zancadas', 'Desarrolla fuerza y equilibrio mientras trabaja los glúteos y cuádriceps.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Piernas'), NOW(), NOW()),
        ('Prensa de piernas', 'Permite cargar pesos elevados para trabajar los cuádriceps y glúteos.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Piernas'), NOW(), NOW()),
        ('Extensiones de pierna', 'Aislamiento específico de los cuádriceps.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Piernas'), NOW(), NOW()),
        ('Curl femoral', 'Fortalece los isquiotibiales para una estabilidad equilibrada.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Piernas'), NOW(), NOW()),
        ('Peso muerto rumano', 'Trabaja los isquiotibiales y glúteos mientras protege la espalda.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Piernas'), NOW(), NOW()),
        ('Elevación de talones', 'Enfocado en los gemelos para fortalecer la parte baja de las piernas.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Piernas'), NOW(), NOW()),
        ('Sentadillas con salto', 'Mejora la explosividad y la fuerza en las piernas.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Piernas'), NOW(), NOW()),
        ('Sentadillas búlgaras', 'Incrementa el equilibrio y activa profundamente los músculos de las piernas.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Piernas'), NOW(), NOW()),
        ('Caminata con peso', 'Fortalece toda la pierna mientras mejora el control del tronco.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Piernas'), NOW(), NOW()),

        -- Tríceps
        ('Fondos en paralelas', 'Fortalece los tríceps mientras trabaja el pecho y hombros secundarios.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Tríceps'), NOW(), NOW()),
        ('Press francés', 'Activa intensamente la parte larga del tríceps.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Tríceps'), NOW(), NOW()),
        ('Extensión de tríceps en polea', 'Aislamiento efectivo de los tríceps con control.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Tríceps'), NOW(), NOW()),
        ('Patada de tríceps', 'Focaliza el tríceps mientras mantiene una buena postura.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Tríceps'), NOW(), NOW()),
        ('Press cerrado con barra', 'Combina el trabajo del tríceps con el pecho.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Tríceps'), NOW(), NOW()),
        ('Extensión con mancuernas', 'Permite trabajar un brazo a la vez para un desarrollo equilibrado.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Tríceps'), NOW(), NOW()),
        ('Extensiones con cuerda', 'Mayor rango de movimiento y activación del tríceps.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Tríceps'), NOW(), NOW()),
        ('Press en máquina cerrado', 'Aislamiento seguro de los tríceps.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Tríceps'), NOW(), NOW()),
        ('Flexiones diamante', 'Activa los tríceps y el pecho en ejercicios con peso corporal.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Tríceps'), NOW(), NOW()),
        ('Pull Over con barra', 'Trabajo en la parte superior del tríceps y el torso.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Tríceps'), NOW(), NOW()),

         -- Bíceps
        ('Curl con barra', 'Ejercicio clásico para desarrollar fuerza y volumen en los bíceps.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Bíceps'), NOW(), NOW()),
        ('Curl con mancuernas', 'Aumenta el tamaño y la simetría de los bíceps con un rango de movimiento completo.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Bíceps'), NOW(), NOW()),
        ('Curl martillo', 'Enfocado en el braquial y braquiorradial, complementando el desarrollo del bíceps.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Bíceps'), NOW(), NOW()),
        ('Predicador con barra', 'Aísla los bíceps para maximizar el esfuerzo en cada repetición.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Bíceps'), NOW(), NOW()),
        ('Concentrado con mancuerna', 'Permite un trabajo específico de cada brazo para mayor simetría.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Bíceps'), NOW(), NOW()),

        -- Hombros
        ('Press militar', 'Fortalece los deltoides, el trapecio y los tríceps.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Hombros'), NOW(), NOW()),
        ('Elevaciones laterales', 'Aumenta el volumen de los deltoides laterales para unos hombros más anchos.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Hombros'), NOW(), NOW()),
        ('Elevaciones frontales', 'Desarrolla los deltoides frontales y mejora la estabilidad del hombro.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Hombros'), NOW(), NOW()),
        ('Press Arnold', 'Combina el desarrollo frontal y lateral del deltoide en un solo movimiento.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Hombros'), NOW(), NOW()),
        ('Encogimientos con barra', 'Fortalece la parte superior del trapecio.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Trapecio'), NOW(), NOW()),

        -- Trapecio
        ('Encogimientos con barra', 'Activa la parte superior del trapecio para aumentar su grosor.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Trapecio'), NOW(), NOW()),
        ('Remo vertical', 'Trabaja el trapecio y los deltoides laterales.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Trapecio'), NOW(), NOW()),
        ('Face Pull', 'Fortalece la parte trasera del trapecio y mejora la postura.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Trapecio'), NOW(), NOW()),
        ('Encogimientos con mancuernas', 'Mejora el control y la activación del trapecio superior.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Trapecio'), NOW(), NOW()),

        -- Antebrazo
        ('Curl de muñeca', 'Fortalece la parte interna del antebrazo.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Antebrazo'), NOW(), NOW()),
        ('Curl inverso', 'Trabaja la parte superior del antebrazo y el braquiorradial.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Antebrazo'), NOW(), NOW()),
        ('Farmers walk', 'Desarrolla la fuerza de agarre y resistencia del antebrazo.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Antebrazo'), NOW(), NOW()),
        ('Rotaciones de muñeca con mancuerna', 'Fortalece y estabiliza los músculos del antebrazo.', (SELECT id FROM tbl_muscle_groups WHERE name = 'Antebrazo'), NOW(), NOW());
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM tbl_exercises;
    `)
  }
}
