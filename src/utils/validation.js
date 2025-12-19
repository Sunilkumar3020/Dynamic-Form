export function validationField(value, rules) {
    if (!rules) return null;

    if (rules.required && !value) {
        return "This field is required";
    }

    if (rules.pattern && !rules.pattern.test(value)) {
        return rules.message || "Invalid format";
    }
    return null
}

