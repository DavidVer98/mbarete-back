import { Type } from 'class-transformer'
import { IsNotEmpty, IsArray, ArrayMinSize, ValidateNested } from 'class-validator'

export class RoutineExerciseDto {
  @IsNotEmpty()
  id: number
}

export class CreateRoutineWithExercisesDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  description: string

  // @IsNotEmpty()
  // ownerId: number

  // @IsBoolean()
  // isPublic: boolean

  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty({ each: true })
  dayOfWeek: number[]

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => RoutineExerciseDto)
  exercises: RoutineExerciseDto[]
}
