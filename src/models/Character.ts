export interface Character {
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
}
