namespace APP {

    //Validable
    export interface validable {
        value: string | number;
        required: boolean;
        minLength?: number;
        maxLength?: number;
        min?: number;
        max?: number;
    }

    export function validate(validated: validable): boolean {
        let isValid = true;
        if (validated.required) {
            isValid = isValid && validated.value.toString().trim().length > 0
        }
        if (validated.minLength && typeof validated.value === 'string') {
            isValid = isValid && validated.value.trim().length >= validated.minLength;
        }
        if (validated.maxLength && typeof validated.value === 'string') {
            isValid = isValid && validated.value.trim().length <= validated.maxLength;
        }
        if (validated.min && typeof validated.value === 'number') {
            isValid = isValid && validated.value > validated.min;
        }
        if (validated.max && typeof validated.value === 'number') {
            isValid = isValid && validated.value < validated.max;
        }
        if (!isValid) {
            console.log("Invalid input:" + validated);
        }
        return isValid;
    }

}