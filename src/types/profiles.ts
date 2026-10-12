export interface ProfileCard {
  name: string;
  semester: string;
  university: string;
  focus: string;
  id: string;
}

export interface Profile {
  badge: string;
  reference: string;
  name: string;
  career: string;
  description: string[];
  image: string;
  card: ProfileCard;
}