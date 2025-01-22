import { FC, ReactNode } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import Button from './Button';
import { LinkProps } from 'next/link';

interface NavigationButtonProps extends Omit<LinkProps, 'as'> {
  children: ReactNode;
  className?: string;
  filled?: boolean;
  inverted?: boolean;
}

export const NavigationButton: FC<NavigationButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <Button as="link" className={`flex items-center gap-2 ${className}`} {...props}>
      {children}
      <HiArrowRight className="w-4 h-4" />
    </Button>
  );
};

export default NavigationButton;
