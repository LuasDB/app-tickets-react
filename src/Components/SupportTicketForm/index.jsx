import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'; // Asegúrate de tener este componente o créalo similar a Input

export default function SupportTicketForm({ label,name, value, onChange, error }) {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <Textarea
          name={name}
          id={name}
          value={value}
          placeholder="Describe tu problema en detalle..."
          className={`disabled:dark:text-white ${error ? 'border-red-500 ring-1 ring-red-500' : ''}`}
          onChange={onChange}
          rows={6}
        />
      </div>

    </div>
  );
}
