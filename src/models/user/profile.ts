export type ProfileProps = {
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  birthDate?: Date;
  aboutMe?: string;
};

export type IdentityFormProps = { userId: string } & ProfileProps;
