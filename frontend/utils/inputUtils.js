const validateBirthdate = (birthdate) => {
    // Revisar que la fecha de nacimiento sea la correcta
    const validBirthdate = new Date(birthdate.year, (+birthdate.month - 1), birthdate.day)
    const result = {
        status: false,
        msg: ''
    }
  
    // Fecha invalida
    if (validBirthdate.getMonth() !== (+birthdate.month - 1)) {
        result.msg = 'Debe ingresar una fecha válida.'
  
        return result
  
    // Fecha valida
    } else {
        // Validar mayoria de edad (18 años)
        const today = new Date()
        const m = today.getMonth() - validBirthdate.getMonth()
        let age = today.getFullYear() - validBirthdate.getFullYear()
  
        // Calculo de edad correcta
        if (m < 0 || (m === 0 && today.getDate() < validBirthdate.getDate())) {
            age--
        }
  
        if (age < 18) {
            result.msg = 'Debe ser mayor de 18 años.'
  
            return result
        } else {
            result.status = true
            result.msg = 'Edad correcta.'
  
            return result
        }
    }
}

const dataURItoBlob = (dataURI, type) => {
    // convert base64 to raw binary data held in a string
    let byteString = atob(dataURI.split(',')[1])

    // separate out the mime component
    // let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    let ab = new ArrayBuffer(byteString.length)
    let ia = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
    }

    // write the ArrayBuffer to a blob, and you're done
    let bb = new Blob([ab], { type })
    return bb
}

export { validateBirthdate, dataURItoBlob }
