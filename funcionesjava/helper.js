
/* Funcion de flecha que se encargara de verificar y validar que los parametros
entregado por el usuario sean aceptable*/
const verificar = (id) => {
    const input = document.getElementById(id)
    const div = document.getElementById('e-' + id)
    input.classList.remove('is-invalid')
    /* Aqui se verificara si los parametros estan vacios*/
    if (input.value.trim() == '') {
        input.classList.add('is-invalid')
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>'
    /* Si los parametros no estan vacios ocurrira lo siguiente*/
    } else {
        /* A los parametros si escritos se le asigna un estilo verde significado "valido"*/
        input.classList.add('is-valid')
        div.innerHTML = ''
        /* Aqui se verifica si la fecha inicio y fecha fin son actuales, solo permitira desde hoy al mañana y se ejecuta la funcion validarfecha*/
        if (id === 'fechastart' || id === 'fechaend') {
            const dia = validarFecha(input.value)
            if (dia < 0) {
                input.classList.add('is-invalid')
                div.innerHTML =`<span class="badge bg-danger">La fecha de la tarea debe ser actual</span>`
            }
        }
    }
}

/* Funcion validarfecha */
const validarFecha = (fecha) => {
    const hoy = new Date()
    const fechaInput = new Date(fecha)
    const resta = fechaInput - hoy
    const dia = resta / (1000 * 60 * 60 * 24)
    return dia.toFixed(0)
}

/* Funcion de limpiar los parametros ingresados por el usuario*/
const limpiar = () => {
    document.querySelector('form').reset()
    document.querySelectorAll('.form-control,.form-select,.form-check-input').forEach(item => {
        item.classList.remove('is-invalid')
        item.classList.remove('is-valid')
        document.getElementById(`e-${item.name}`).innerHTML = ''
    })
    document.getElementById('nom').readOnly = false
    document.getElementById('btnGuardar').value = 'Guardar'
    
}


/* Funcion para validar el radio (proceso , no iniciado, finalizado)*/
const validaRadio = (name) =>{
    const radio=document.querySelector(`input[name="${name}"]:checked`)
    const div=document.getElementById(`e-${name}`)
    const all=document.querySelectorAll(`input[name="${name}"]`)

    if (!radio){
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>'
        all.forEach(item=>{
            item.classList.add('is-invalid')
        })
    }
    else{
        div.innerHTML = ''
        all.forEach(item=>{
            item.classList.remove('is-invalid')
            item.classList.add('is-valid')
        })
    }
}
