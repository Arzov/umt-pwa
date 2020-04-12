function checkRequire (rule, value, callback) {
    let error = 'Seleccione un tipo de match.'

    if (value)
        callback()
    else
        callback(error)
}

export default {
    title: 'Match',
    required: true,
    placeholder: '',
    extra: '',
    decorator: [
        'match',
        {
            initialValue: '7v7',
            rules: [
                { validator: checkRequire }
            ]
        }
    ]
}
