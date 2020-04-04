const { validateBirthdate } = require('@/utils/inputValidator')

function checkDate (rule, value, callback) {
    let response = validateBirthdate(value)

    if (!response.status)
        callback(response.msg)
    else
        callback()
}

export default {
    title: 'fecha de nacimiento',
    required: true,
    placeholder: '',
    extra: '',
    decorator: [
        'birthdate',
        {
            initialValue: { day: undefined, month: undefined, year: undefined },
            rules: [
                { validator: checkDate }
            ]
        }
    ]
}
