module.exports = {
    title: 'correo electrónico',
    required: true,
    placeholder: 'Ingresa tu correo electrónico',
    extra: '',
    decorator: [
        'username',
        {
            initialValue: undefined,
            rules: [
                { required: true, message: 'Ingrese un correo electrónico.' },
                { type: 'email', message: 'Ingrese un correo válido.' }
            ]
        }
    ]
}
