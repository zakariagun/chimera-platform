import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// تعريف أنماط البطاقة
// Card variants definition
const cardVariants = cva(
  // الأنماط الأساسية - Base styles
  'rounded-lg border bg-card text-card-foreground transition-all duration-200',
  {
    variants: {
      variant: {
        // العادي - Default variant
        default: 'border-border shadow-sm hover:shadow-md',
        
        // مرفوع - Elevated variant
        elevated: 'border-border shadow-lg hover:shadow-xl transform hover:scale-[1.02]',
        
        // محيط - Outlined variant
        outlined: 'border-2 border-primary/20 shadow-none hover:border-primary/40 hover:shadow-sm'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

// خصائص مكون البطاقة
// Card component props interface
export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /**
   * تأثير hover - Hover effect
   */
  hover?: boolean;
  
  /**
   * المحتوى - Content
   */
  children: React.ReactNode;
}

/**
 * مكون البطاقة الأساسي
 * Primary Card Component
 * 
 * @example
 * // بطاقة بسيطة
 * <Card>محتوى البطاقة</Card>
 * 
 * // بطاقة مرفوعة مع تأثير hover
 * <Card variant="elevated" hover>
 *   <Card.Header>العنوان</Card.Header>
 *   <Card.Content>المحتوى</Card.Content>
 *   <Card.Footer>التذييل</Card.Footer>
 * </Card>
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, hover = true, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        cardVariants({ variant }),
        hover && 'cursor-pointer',
        className
      )}
      {...props}
    />
  )
);

Card.displayName = 'Card';

// خصائص رأس البطاقة
// Card Header component props interface
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * مكون رأس البطاقة
 * Card Header Component
 */
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  )
);

CardHeader.displayName = 'CardHeader';

// خصائص عنوان البطاقة
// Card Title component props interface
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

/**
 * مكون عنوان البطاقة
 * Card Title Component
 */
const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'text-2xl font-semibold leading-none tracking-tight',
        className
      )}
      {...props}
    />
  )
);

CardTitle.displayName = 'CardTitle';

// خصائص وصف البطاقة
// Card Description component props interface
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

/**
 * مكون وصف البطاقة
 * Card Description Component
 */
const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
);

CardDescription.displayName = 'CardDescription';

// خصائص محتوى البطاقة
// Card Content component props interface
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * مكون محتوى البطاقة
 * Card Content Component
 */
const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div 
      ref={ref} 
      className={cn('p-6 pt-0', className)} 
      {...props} 
    />
  )
);

CardContent.displayName = 'CardContent';

// خصائص تذييل البطاقة
// Card Footer component props interface
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * مكون تذييل البطاقة
 * Card Footer Component
 */
const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  )
);

CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants
};

export default Card;