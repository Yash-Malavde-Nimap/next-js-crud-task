export default function Button({ label, type, className, method }) {
  return (
    <button type={type} onClick={method} className={className}>
      {label}
    </button>
  );
}
