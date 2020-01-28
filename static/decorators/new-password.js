module.exports = {
    title: 'contraseña nueva',
    required: true,
    placeholder: 'Ingresa tu nueva contraseña',
    extra: '',
    decorator: [
        'password',
        {
            initialValue: undefined,
            rules: [
                { required: true, message: 'Ingrese una contraseña.' }
            ]
        }
    ]
}
