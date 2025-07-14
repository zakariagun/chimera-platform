import React, { useEffect, useRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

// تعريف أنماط النافذة المنبثقة
// Modal variants definition
const modalVariants = cva(
  // الأنماط الأساسية - Base styles
  'fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg',
  {
    variants: {
      size: {
        // صغير - Small
        sm: 'max-w-[425px]',
        
        // متوسط - Medium (default)
        md: 'max-w-lg',
        
        // كبير - Large
        lg: 'max-w-2xl',
        
        // كبير جداً - Extra Large
        xl: 'max-w-4xl'
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
);

// تعريف أنماط الخلفية
// Overlay variants definition
const overlayVariants = cva(
  'fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity duration-200'
);

// خصائص مكون النافذة المنبثقة
// Modal component props interface
export interface ModalProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modalVariants> {
  /**
   * حالة الفتح - Open state
   */
  isOpen: boolean;
  
  /**
   * دالة الإغلاق - Close function
   */
  onClose: () => void;
  
  /**
   * العنوان - Title
   */
  title?: string;
  
  /**
   * إظهار زر الإغلاق - Show close button
   */
  showCloseButton?: boolean;
  
  /**
   * الإغلاق عند النقر على الخلفية - Close on overlay click
   */
  closeOnOverlayClick?: boolean;
  
  /**
   * الإغلاق عند الضغط على ESC - Close on ESC key
   */
  closeOnEsc?: boolean;
  
  /**
   * المحتوى - Content
   */
  children: React.ReactNode;
}

/**
 * مكون النافذة المنبثقة
 * Modal Component
 * 
 * @example
 * // نافذة منبثقة بسيطة
 * <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="عنوان النافذة">
 *   <p>محتوى النافذة</p>
 * </Modal>
 * 
 * // نافذة منبثقة كبيرة مع تعطيل الإغلاق التلقائي
 * <Modal 
 *   isOpen={isOpen} 
 *   onClose={() => setIsOpen(false)}
 *   size="lg"
 *   closeOnOverlayClick={false}
 *   closeOnEsc={false}
 * >
 *   <Modal.Header>عنوان مخصص</Modal.Header>
 *   <Modal.Content>المحتوى</Modal.Content>
 *   <Modal.Footer>أزرار التحكم</Modal.Footer>
 * </Modal>
 */
const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ 
    className,
    size,
    isOpen,
    onClose,
    title,
    showCloseButton = true,
    closeOnOverlayClick = true,
    closeOnEsc = true,
    children,
    ...props 
  }, ref) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // التعامل مع مفاتيح لوحة المفاتيح
    // Handle keyboard events
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && closeOnEsc) {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleKeyDown);
        // منع التمرير في الخلفية
        // Prevent background scrolling
        document.body.style.overflow = 'hidden';
      }

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }, [isOpen, closeOnEsc, onClose]);

    // التركيز التلقائي
    // Auto focus
    useEffect(() => {
      if (isOpen && modalRef.current) {
        modalRef.current.focus();
      }
    }, [isOpen]);

    // التعامل مع النقر على الخلفية
    // Handle overlay click
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget && closeOnOverlayClick) {
        onClose();
      }
    };

    // عدم عرض النافذة إذا كانت مغلقة
    // Don't render if closed
    if (!isOpen) return null;

    return (
      <>
        {/* الخلفية المعتمة - Overlay */}
        <div
          className={overlayVariants()}
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
        
        {/* النافذة المنبثقة - Modal */}
        <div
          ref={modalRef}
          className={cn(modalVariants({ size }), className)}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          tabIndex={-1}
          {...props}
        >
          {/* رأس النافذة - Modal Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between space-y-0 pb-4">
              {title && (
                <h2 
                  id="modal-title"
                  className="text-lg font-semibold leading-none tracking-tight"
                >
                  {title}
                </h2>
              )}
              
              {showCloseButton && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-6 w-6 p-0 hover:bg-muted"
                  aria-label="إغلاق النافذة"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
          
          {/* محتوى النافذة - Modal Content */}
          <div className="flex-1">
            {children}
          </div>
        </div>
      </>
    );
  }
);

Modal.displayName = 'Modal';

// خصائص رأس النافذة المنبثقة
// Modal Header component props interface
export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * مكون رأس النافذة المنبثقة
 * Modal Header Component
 */
const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 text-center sm:text-right pb-4', className)}
      {...props}
    />
  )
);

ModalHeader.displayName = 'ModalHeader';

// خصائص عنوان النافذة المنبثقة
// Modal Title component props interface
export interface ModalTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

/**
 * مكون عنوان النافذة المنبثقة
 * Modal Title Component
 */
const ModalTitle = React.forwardRef<HTMLHeadingElement, ModalTitleProps>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
);

ModalTitle.displayName = 'ModalTitle';

// خصائص وصف النافذة المنبثقة
// Modal Description component props interface
export interface ModalDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

/**
 * مكون وصف النافذة المنبثقة
 * Modal Description Component
 */
const ModalDescription = React.forwardRef<HTMLParagraphElement, ModalDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
);

ModalDescription.displayName = 'ModalDescription';

// خصائص محتوى النافذة المنبثقة
// Modal Content component props interface
export interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * مكون محتوى النافذة المنبثقة
 * Modal Content Component
 */
const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
  ({ className, ...props }, ref) => (
    <div 
      ref={ref} 
      className={cn('py-4', className)} 
      {...props} 
    />
  )
);

ModalContent.displayName = 'ModalContent';

// خصائص تذييل النافذة المنبثقة
// Modal Footer component props interface
export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * مكون تذييل النافذة المنبثقة
 * Modal Footer Component
 */
const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4 gap-2',
        className
      )}
      {...props}
    />
  )
);

ModalFooter.displayName = 'ModalFooter';

export {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalContent,
  ModalFooter,
  modalVariants
};

export default Modal;