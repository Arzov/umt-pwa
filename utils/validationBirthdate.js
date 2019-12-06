export default function validationBirthdate (birthdate) {
  // Revisar que la fecha de nacimiento sea la correcta
  const validBirthdate = new Date(birthdate.year, (+birthdate.month - 1), birthdate.day)
  const result = {
      status: false,
      msg: ''
  }

  // Fecha invalida (solo se valida mes de febrero donde podria haber error)
  if (validBirthdate.getMonth() !== (+birthdate.month - 1)) {
      result.msg = 'Debe ingresar una fecha valida!'

      return result

  // Fecha valida
  } else {
      // Validar mayoria de edad (18 anos)
      const today = new Date()
      const m = today.getMonth() - validBirthdate.getMonth()
      let age = today.getFullYear() - validBirthdate.getFullYear()

      // Calculo de edad correcta
      if (m < 0 || (m === 0 && today.getDate() < validBirthdate.getDate())) {
          age--
      }

      if (age < 18) {
          result.msg = 'Debe ser mayor de 18 anos!'

          return result
      } else {
          result.status = true
          result.msg = 'Edad correcta!'

          return result
      }
  }
}
