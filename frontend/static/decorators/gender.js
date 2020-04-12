function checkRequire (rule, value, callback) {
    let error = 'Seleccione un género.'

    if (value)
        callback()
    else
        callback(error)
}

export default {
    title: 'Género',
    required: true,
    placeholder: '',
    extra: '',
    decorator: [
        'gender',
        {
            initialValue: 'M',
            rules: [
                { validator: checkRequire }
            ]
        }
    ]
}
