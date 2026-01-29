import { User } from '@prisma/client';

interface Props {
  data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
  return <div>Profile Form</div>;
};
