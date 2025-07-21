export enum CommonTextType {
  T2_BD_BLACK = 'text-t2-bd',
  T3_BD_BLACK = 'text-t3-bd',
  T4_BD_BLACK = 'text-t4-bd',
  T5_SB_BLACK = 'text-t5-sb',
  T6_SB_BLACK = 'text-t6-sb',
  CAP1_RG_GRAY_300 = 'text-cap1-rg-300',
  CAP1_RG_GRAY_200 = 'text-cap1-rg-200',
}
export interface CommonTextProps {
  text: string;
  type: CommonTextType;
  className?: string; // Optional className for additional styling
}
