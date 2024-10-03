import { reactive, computed } from 'vue';
import { useToast } from 'primevue/usetoast';

export function useErrorHandling() {
    const toast = useToast();

    const errors = reactive({
        validation: {},
        critical: null,
        warning: null,
    });

    const clearErrors = () => {
        errors.validation = {};
        errors.critical = null;
        errors.warning = null;
    };

    const hasNoErrors = computed(() => {
        const noValidation = Object.keys(errors.validation).length === 0;
        const noCritical = errors.critical === null;
        const noWarning = errors.warning === null;

        return noValidation && noCritical && noWarning;
    });

    const handleAxiosError = (error) => {
        clearErrors();
        if (error.response) {
            const status = error.response.status;
            const data = error.response.data;

            if (status === 422 && data.errors) {
                for (const key in data.errors) {
                    errors.validation[key] = data.errors[key];
                }
            } else if (status >= 500) {
                errors.critical = data.message || 'A critical error occurred.';
                toast.add({
                    severity: 'error',
                    summary: 'Server Error',
                    detail: errors.critical,
                    life: 3000,
                });
            }
        } else if (error.request) {
            errors.critical = 'The server did not respond.';
            toast.add({
                severity: 'error',
                summary: 'Network Error',
                detail: errors.critical,
                life: 3000,
            });
        }
    };

    return { errors, handleAxiosError, clearErrors, hasNoErrors };
}
