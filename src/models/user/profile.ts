export type ProfileProps = {
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  birthDate?: Date;
  aboutMe?: string;
  imageUrl?: string;
};

export type IdentityFormProps = {
  userId: string;
  profileImg: File | null;
} & ProfileProps;
