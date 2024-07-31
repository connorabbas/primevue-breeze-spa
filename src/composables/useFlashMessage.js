import { reactive, readonly } from 'vue';

export function useFlashMessage() {
    // state is local to the composable, will reset on every new instance (every new route visit)
    const flashMessages = reactive({
        success: '',
        info: '',
        warning: '',
        danger: '',
    });

    function setFlashMessage(type, message) {
        if (type in flashMessages) {
            flashMessages[type] = message;
        } else {
            console.warn(`Unknown flash message type: ${type}`);
        }
    }

    function clearFlashMessages() {
        Object.keys(flashMessages).forEach((key) => {
            flashMessages[key] = '';
        });
    }

    return {
        flashMessages: readonly(flashMessages),
        setFlashMessage,
        clearFlashMessages,
    };
}
