import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'mint' | 'blue' | 'danger' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  isLoading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  style = {},
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: '#FFEB3B', // Pastel Accent Yellow
          color: '#000000',
          border: '2px solid #000000',
          boxShadow: '4px 4px 0px 0px #000000',
        };
      case 'secondary':
        return {
          background: '#FFE0B2', // Pastel Peach
          color: '#000000',
          border: '2px solid #000000',
          boxShadow: '4px 4px 0px 0px #000000',
        };
      case 'mint':
        return {
          background: '#E8F5E9', // Pastel Mint Green
          color: '#000000',
          border: '2px solid #000000',
          boxShadow: '4px 4px 0px 0px #000000',
        };
      case 'blue':
        return {
          background: '#E3F2FD', // Pastel Blue
          color: '#000000',
          border: '2px solid #000000',
          boxShadow: '4px 4px 0px 0px #000000',
        };
      case 'danger':
        return {
          background: '#FFCDD2', // Pastel Red / Pink
          color: '#000000',
          border: '2px solid #000000',
          boxShadow: '4px 4px 0px 0px #000000',
        };
      case 'ghost':
        return {
          background: 'transparent',
          color: '#000000',
          border: '2px solid transparent',
          boxShadow: 'none',
        };
      default:
        return {
          background: '#FFEB3B',
          color: '#000000',
          border: '2px solid #000000',
          boxShadow: '4px 4px 0px 0px #000000',
        };
    }
  };

  const getPadding = () => {
    switch (size) {
      case 'sm':
        return '6px 14px';
      case 'lg':
        return '14px 28px';
      default:
        return '10px 22px';
    }
  };

  const vStyles = getVariantStyles();

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`neo-button ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontWeight: 800,
        fontSize: size === 'sm' ? '0.8rem' : size === 'lg' ? '1.05rem' : '0.9rem',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        padding: getPadding(),
        borderRadius: '8px',
        cursor: (disabled || isLoading) ? 'not-allowed' : 'pointer',
        opacity: (disabled || isLoading) ? 0.6 : 1,
        transition: 'all 0.15s ease',
        ...vStyles,
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled && !isLoading && variant !== 'ghost') {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '6px 6px 0px 0px #000000';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !isLoading && variant !== 'ghost') {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = vStyles.boxShadow;
        }
      }}
      onMouseDown={(e) => {
        if (!disabled && !isLoading && variant !== 'ghost') {
          e.currentTarget.style.transform = 'translate(2px, 2px)';
          e.currentTarget.style.boxShadow = '2px 2px 0px 0px #000000';
        }
      }}
      onMouseUp={(e) => {
        if (!disabled && !isLoading && variant !== 'ghost') {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '6px 6px 0px 0px #000000';
        }
      }}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
          <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};
