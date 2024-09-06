import { TitleEnum } from '@app/thirty-stf-repository/enum/entity.enum';
import { Title } from '@prisma/client';

export interface CreateUserInput {
  id: string;
  auth0UserId?: string;
  title?: Title;
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
  address?: string;
}
