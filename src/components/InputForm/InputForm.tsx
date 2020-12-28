import React from 'react';

type InputFormProps = {
    name: string,
    placeholder?: string,
    type: 'button' | 'checkbox' | 'color' | 'date' | 'email' | 'file' | 'password' | 'search' | 'radio' | 'text' | 'tel' | 'url',
    label?: string,
    error?: string|undefined,
    id?: string,
    additionalClass?: string,
    defaultValue?: any
}

const InputForm = React.forwardRef<HTMLInputElement, InputFormProps>(({ name, label, type, id, error, placeholder, defaultValue }, ref) => {
    const inputStyles = {
        normal: 'shadow-sm border border-gray-300 w-full rounded-md sm:text-sm focus:border-blue-300 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-10',
        errors: 'shadow-sm border border-red-300 ring-2 ring-red-300 ring-opacity-10 w-full rounded-md sm:text-sm focus:border-red-300 focus:ring-2 focus:ring-red-200 focus:ring-opacity-10'
    }
    return (
        <div className={name}>
            {label && 
                <label htmlFor={name} className="block text-sm font-medium text-blueGray-600">{label}</label>
            }
            <div className="mt-1">
                <input type={type} id={id ?? name} name={name} className={!error ? inputStyles.normal : inputStyles.errors} placeholder={placeholder} ref={ref} defaultValue={defaultValue} />
            </div>
            {error && <p className="mt-2 ml-2 text-sm text-danger">{error}</p>}
        </div>
    )
});

export default InputForm;