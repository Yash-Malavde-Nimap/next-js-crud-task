import React from "react";

export default function Input({
  label,
  name,
  type,
  register,
  required = false,
  className,
  error,
}) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        {...register(name, { required })}
        className={className}
        autoComplete="off"
      />
      {error && <span className="error-message">{label} is required</span>}
    </div>
  );
}
