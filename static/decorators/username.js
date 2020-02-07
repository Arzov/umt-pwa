import { emailRules } from './email'

export default {
    title: 'correo electrónico',
    required: true,
    placeholder: 'Ingresa tu correo electrónico',
    extra: '',
    decorator: [
        'username',
        {
            initialValue: undefined,
            rules: emailRules
        }
    ]
}
