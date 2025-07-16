export enum CommonTextType {
  T2_BD = 'text-t2-bd',
  T3_BD = 'text-t3-bd',
  T5_SB = 'text-t5-sb',
  T6_SB = 'text-t6-sb',
  CAP1_RG = 'text-cap1-rg',
}
export interface CommonTextProps {
  text: string;
  type: CommonTextType;
  className?: string; // Optional className for additional styling
}
