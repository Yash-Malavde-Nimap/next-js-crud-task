export default function Button({ label, type, className }) {
  return (
    <div>
      <button type={type} className={className}>
        {label}
      </button>
    </div>
  );
}
