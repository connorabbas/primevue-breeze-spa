# Laravel Breeze & PrimeVue
A [PrimeVue](https://primevue.org/) SPA starter kit meant for use with a [Laravel Breeze](https://laravel.com/docs/master/starter-kits#laravel-breeze) API stack backend.

An alternative to: https://github.com/connorabbas/primevue-breeze-inertia

![image](https://github.com/user-attachments/assets/83e597ee-1724-4364-8bc2-f2642fd36c5e)

## Setup 
1. Clone the repo (or download the zip)
2. Create a new `.env` file in the root directory, reference the `.env.example` file for the vars/values
3. Create a [new Laravel application](https://laravel.com/docs/master/installation) 
4. Install [Laravel Breeze](https://laravel.com/docs/master/starter-kits#laravel-breeze-installation) using the [API Stack](https://laravel.com/docs/master/starter-kits#breeze-and-next) option
5. Setup necessary `.env` configuration values in the Laravel API project
    ```
    # Remember, your SPA and API must share the same top-level domain
    # Example implementation, could also use localhost with different port numbers
    APP_URL="http://breeze-api.test" # Match this value with VITE_API_BASE_URL in the Vue app
    FRONTEND_URL="http://vue.breeze-api.test"
    SANCTUM_STATEFUL_DOMAINS="vue.breeze-api.test"
    SESSION_DOMAIN=".breeze-api.test"
    ```

## Theme
This starter kit provides a light/dark mode and custom theme functionality provided by the powerful PrimeVue theming system, using styled mode and custom design token values.

The starting point for customizing your theme will be the `/src/modules/theme-preset.mjs` module file. To quickly change the look and feel of your theme, swap the [primary](https://primevue.org/theming/styled/#primary) values with a different set of [colors](https://primevue.org/theming/styled/#colors), change the [surface](https://primevue.org/theming/styled/#surface) `colorScheme` values (slate, gray, neutral, etc.), or completely change the [preset theme](https://primevue.org/theming/styled/#presets) (Aura used by default).

Please reference the [PrimeVue Styled Mode Docs](https://primevue.org/theming/styled/) to fully understand how this system work, and how to further customize your theme to make it your own.
