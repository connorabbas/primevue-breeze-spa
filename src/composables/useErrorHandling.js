import { reactive, computed } from 'vue';

export function useErrorHandling() {
    const errors = reactive({
        validation: {},
        critical: null,
        other: null,
    });

    const clearErrors = () => {
        errors.validation = {};
        errors.critical = null;
        errors.other = null;
    };

    const hasNoErrors = computed(() => {
        const noValidation = Object.keys(errors.validation).length === 0;
        const noCritical = errors.critical === null;
        const noOther = errors.other === null;

        return noValidation && noCritical && noOther;
    });

    const handleAxiosError = (error) => {
        clearErrors();
        if (error.response) {
            const status = error.response.status;
            const data = error.response.data;

            if (status === 422 && data.errors) {
                // Laravel validation errors
                for (const key in data.errors) {
                    errors.validation[key] = data.errors[key];
                }
            } else if (status >= 500) {
                errors.critical = data.message || 'A critical error occurred.';
            } else {
                errors.other = data.message || 'An error occurred.';
            }
        } else if (error.request) {
            errors.critical = 'The server did not respond.';
        } else {
            errors.other = error.message;
        }
    };

    return { errors, handleAxiosError, clearErrors, hasNoErrors };
}
