export type TokenUser = {
  id: number;
  email: string;
  userType: string;
};

export const imageSizes = [
  {
    label: 'sm',
    size: [180, 180],
  },
  {
    label: 'md',
    size: [720, 350],
  },
  {
    label: 'lg',
    size: [1440, 700],
  },
];

export enum ImageSizesEnum {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}
