function checkRequire (rule, value, callback) {
    let error = 'Ingrese un rango válido.'

    if (value && value.length === 2)
        callback()
    else
        callback(error)
}

export default {
    title: 'Age',
    required: true,
    placeholder: '',
    extra: '',
    decorator: [
        'age',
        {
            initialValue: [18, 22],
            rules: [
                { validator: checkRequire }
            ]
        }
    ]
}
