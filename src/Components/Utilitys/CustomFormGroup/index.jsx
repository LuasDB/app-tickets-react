import { Input } from '@/components/ui/input'

export default function CustomFormGroup({ label, type, name, options = [], value, onChange, error }) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor={name} className="block text-sm font-medium text-blue-400 ">
          {label}
        </label>

        {type === 'select' ? (
          <select
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            className={`w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white ${error ? 'border-red-500 ring-1 ring-red-500' : ''}`}
          >
            <option value="">--Selecciona una opción--</option>
            {options.map(option => (
              <option key={`option--${option.label}`} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <Input
            type={type}
            name={name}
            id={name}
            value={value}
            placeholder={label}
            onChange={onChange}
            className={`'disabled:dark:text-white' ${error ? 'border-red-500 ring-1 ring-red-500' : ''}`}
          />
        )}
      </div>
    </div>
  );
}
