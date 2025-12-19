import { useState } from "react"
import { validationField } from "../utils/validation";


export default function DynamicForm({ config }) {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({})

    const isVisible = (field) => {
        if (!field.dependsOn) return true;
        if (typeof field.showIf === 'function') {
            return field.showIf(values)
        }
        return values[field.dependsOn] === field.showIf;
    }

    const handleChange = (name, value, validation) => {
        setValues((prev) => (
            {
                ...prev,
                [name]: value
            }
        ))
        if (validation) {
            const error = validateField(value, validation);
            setErrors((prev) => ({
                ...prev,
                [name]: error
            }))
        }
    }
    const handleSubmit = e => {
        e.preventDefault();
        const newErrors = {};
        config.forEach(field => {
            if (!isVisible(field)) return;
            const error = validationField(values[field.name], field.validation);
            if (error) newErrors[field.name] = error;
        })
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            alert(JSON.stringify(value, null, 2));
        }
    }
    console.log(config)
    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 400 }} >

            {config.map(field => {
                if (!isVisible(field)) return null;
                return (
                    <div key={field.name} style={{ marginBottom: 16 }}>
                        <label htmlFor={field.label}>{field.label}</label>
                        {field.type === "text" && (
                            <input type="text" value={values[field.name] || ''} onChange={(e) => handleChange(field.name, e.target.value, field.validation)} />
                        )}
                        {field.type === 'select' && (
                            <select value={values[field.name] || ''} onChange={e => handleChange(field.name, e.target.value, field.validation)}>

                                <option value=''>Select</option>
                                {field.options.map(option => (
                                    <option key={option.value} value={option.value} >{option.label}</option>
                                ))}
                            </select>
                        )}

                        {errors[field.name] && (
                            <div style={{ color: "red", fontSize: 12 }}>
                                {errors[field.name]}
                            </div>
                        )}
                    </div>
                )
            })}
            <button type="submit" > Submit</button>
        </form>

    )
}