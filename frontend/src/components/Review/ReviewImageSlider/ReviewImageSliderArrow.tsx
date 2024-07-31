import { CaretLeftIcon, CaretRightIcon } from '@/assets/icons';

export const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;

  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <CaretLeftIcon />
    </div>
  );
};
export const NextArrow = (props: any) => {
  const { className, style, onClick } = props;

  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <CaretRightIcon />
    </div>
  );
};
