import { CaretLeft, CaretRight } from '@/assets/icons';

export const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;

  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <CaretLeft />
    </div>
  );
};
export const NextArrow = (props: any) => {
  const { className, style, onClick } = props;

  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <CaretRight />
    </div>
  );
};
