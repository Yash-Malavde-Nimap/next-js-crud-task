export default function Button({ label, type, className, method }) {
  // const { handleDelete } = onClick;
  // const { handleDelete } = method;
  return (
    <button type={type} onClick={method} className={className}>
      {label}
    </button>
  );
}
