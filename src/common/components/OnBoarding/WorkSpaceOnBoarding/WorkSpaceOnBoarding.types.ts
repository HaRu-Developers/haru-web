export enum Position {
  topLeft = 'top-left',
  topRight = 'top-right',
  bottomLeft = 'bottom-left',
  bottomRight = 'bottom-right',
}

export interface Feature {
  title: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  position: Position;
}
