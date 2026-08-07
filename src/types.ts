export type EffectType = 'bounce' | 'glow' | 'drift' | 'shimmer';
export type LayerType = 'text' | 'badge' | 'image';

export interface Layer {
  id: string;
  name: string;
  type: LayerType;
  content: string;
  effect: EffectType;
  delay: number;
}
