module.exports = {
    title: 'código',
    required: true,
    placeholder: 'Ingresa el código enviado',
    extra: '',
    decorator: [
        'code',
        {
            initialValue: undefined,
            rules: [
                { required: true, message: 'Ingrese el código recibido en su correo.' }
            ]
        }
    ]
}
