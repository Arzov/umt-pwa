module.exports = {
    title: 'contraseña',
    required: true,
    placeholder: 'Ingresa tu contraseña',
    extra: '',
    decorator: [
        'password',
        {
            initialValue: undefined,
            rules: [
                { required: true, message: 'Ingrese una contraseña.' },
                { min: 6, message: 'La contraseña debe tener al menos 6 caracteres.' }
            ]
        }
    ]
}
