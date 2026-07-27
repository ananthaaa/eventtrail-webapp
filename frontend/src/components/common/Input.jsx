import React from 'react';

export const Input = ({
  label,
  error,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  name,
  required = false,
  options = [], // If type === 'select', pass [{ label, value }]
  className = '',
  ...props
}) => {
  return (
    <div style={{ marginBottom: '16px', width: '100%' }}>
      {label && (
        <label 
          htmlFor={name}
          style={{ 
            display: 'block', 
            fontSize: '0.85rem', 
            fontWeight: 600, 
            color: '#CBD5E1', 
            marginBottom: '6px',
            fontFamily: 'var(--font-body)'
          }}
        >
          {label} {required && <span style={{ color: '#EF4444' }}>*</span>}
        </label>
      )}
      
      {type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`input-field ${className}`}
          style={{
            width: '100%',
            padding: '12px 16px',
            background: 'rgba(15, 23, 42, 0.8)',
            border: error ? '1px solid #EF4444' : '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '10px',
            color: '#F8FAFC',
            fontSize: '0.95rem',
            outline: 'none',
            cursor: 'pointer'
          }}
          {...props}
        >
          {options.map((opt, idx) => (
            <option key={idx} value={opt.value} style={{ background: '#0F172A', color: '#F8FAFC' }}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`input-field ${className}`}
          style={{
            width: '100%',
            padding: '12px 16px',
            background: 'rgba(15, 23, 42, 0.8)',
            border: error ? '1px solid #EF4444' : '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '10px',
            color: '#F8FAFC',
            fontSize: '0.95rem',
            outline: 'none',
            transition: 'all 0.2s ease'
          }}
          {...props}
        />
      )}

      {error && (
        <p style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: '4px', fontWeight: 500 }}>
          {error}
        </p>
      )}
    </div>
  );
};
