import validationBirthdate from '@/utils/validationBirthdate'

function checkDate (rule, value, callback) {
    let response = validationBirthdate(value.birthdate)

    if (!response.status)
        callback(response.msg)
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
