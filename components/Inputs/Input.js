export default function Input({
    label,
  name,
  type,
  value,
  onChange,
  className,
}) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required
        className={className}
        autoComplete="off"
      />
    </div>
  );
}
