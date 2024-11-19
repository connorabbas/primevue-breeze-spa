import { ref } from 'vue';
import router from '@/router';
import { useToast } from 'primevue/usetoast';

export function useAxiosErrorHandling() {
    const toast = useToast();
    const validationErrors = ref({});

    const clearErrors = (...fields) => {
        if (fields.length > 0) {
            fields.forEach((field) => {
                if (field in validationErrors.value) {
                    delete validationErrors.value[field];
                }
            });
        } else {
            validationErrors.value = {};
        }
    };

    const handleAxiosError = (error, options = {}) => {
        clearErrors();
        toast.removeAllGroups();
        let toastSummary = 'Error';
        let toastDetail = '';

        if (error.response) {
            const status = error.response.status;
            const responseData = error.response.data;

            if (status === 419) {
                router.push({ name: 'login' });
            } else if (status === 422 && responseData?.errors) {
                validationErrors.value = responseData.errors;
            } else if (status >= 500) {
                toastSummary = 'Server Error';
                toastDetail = 'A critical error occurred.';
            }
        } else if (error.request) {
            toastSummary = 'Network Error';
            toastDetail = 'We are experiencing technical difficulties, please try again later.';
            // handle as needed
            //console.error('Unexpected Error:', error.message);
        }

        if (toastSummary && toastDetail) {
            toast.add({
                severity: 'error',
                summary: toastSummary,
                detail: toastDetail,
                life: 3000,
            });
        }

        if (options.onError) options.onError(error);
    };

    return {
        validationErrors,
        clearErrors,
        handleAxiosError,
    };
}
