import passwordRules from './password'

export default {
    title: 'contraseña nueva',
    required: true,
    placeholder: 'Ingresa tu nueva contraseña',
    extra: '',
    decorator: [
        'password',
        {
            initialValue: undefined,
            rules: passwordRules
        }
    ]
}
