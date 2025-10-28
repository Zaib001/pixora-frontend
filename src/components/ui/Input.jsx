export default function Input({ label, type="text", ...props }) {
  return (
    <div className="w-full mb-4">
      <label className="block text-sm text-light mb-1">{label}</label>
      <input
        type={type}
        {...props}
        className="w-full px-4 py-2 rounded-md bg-[#1C1C1C] text-light focus:ring-2 focus:ring-primary outline-none"
      />
    </div>
  );
}
