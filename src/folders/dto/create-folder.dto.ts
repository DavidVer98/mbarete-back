// src/folders/dto/create-folder.dto.ts
export class CreateFolderDto {
  name: string

  description?: string

  parentFolderId?: number
}
