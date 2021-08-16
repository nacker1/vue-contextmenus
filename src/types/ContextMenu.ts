export interface Options{
  title?: string;
  type?: 'line' | 'title';
  show?: boolean;
  callback?: ()=>void;
  children?: Array< Options >;
}