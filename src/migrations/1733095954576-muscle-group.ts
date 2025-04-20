import { MigrationInterface, QueryRunner } from 'typeorm'

export class MuscleGroup1733095954576 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO tbl_muscle_groups (name)
      VALUES 
        ('Pecho'),
        ('Espalda'),
        ('Piernas'),
        ('Brazos'),
        ('Abdomen'),
        ('Hombros'),
        ('Trapecio'),
        ('Glúteos'),
        ('Gemelos'),
        ('Antebrazo'),
        ('Tríceps'),
        ('Bíceps');
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM tbl_muscle_groups WHERE name IN ('Pecho', 'Espalda', 'Piernas', 'Brazos', 'Abdomen', 'Hombros', 'Trapecio', 'Glúteos', 'Gemelos', 'Antebrazo', 'Tríceps', 'Bíceps');
    `)
  }
}
