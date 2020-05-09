export const emailRules = [
    { required: true, message: 'Ingrese un correo electrónico.' },
    { type: 'email', message: 'Ingrese un correo válido.' }
]

export default {
    title: 'Correo electrónico',
    required: true,
    placeholder: 'Ingresa tu correo electrónico',
    extra: '',
    decorator: [
        'email',
        {
            initialValue: undefined,
            rules: emailRules
        }
    ]
}
