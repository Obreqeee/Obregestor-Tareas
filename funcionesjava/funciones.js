import { nomrepetido, eliminar, getData, obtener, save, update } from "./firebase.js";

let id = 0
/* al presionar guardar comienza a revisar / verificar si*/
document.getElementById('btnGuardar').addEventListener('click', async () => {
    document.querySelectorAll('.form-control,.form-select').forEach(item => {
        verificar(item.id)
        validaRadio('estadotarea')
    })
    /* Para los inputs que no tienen is-invalid se realizaran las siguientes acciones*/
    if (document.querySelectorAll('.is-invalid').length == 0) {
        const nombre = document.getElementById('nom').value
        const estadotarea = document.querySelector('input[name="estadotarea"]:checked')
        document.getElementById('nom').readOnly = false
        /* Primera accion guardar datos */
        if (document.getElementById('btnGuardar').value == 'Guardar') {
            const repetido = await nomrepetido(nombre)
            /* Si nombre se repite , arrojar error*/
            if (repetido){
            Swal.fire({
                title: "Error",
                text: "El Nombre ingresado ya existe en la base de datos!!",
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK"
            });
            return}
            /* Si no se repite entonces se guardan en variables cada dato ingresado por el input*/
            const tarea = {
                'tipoe': document.getElementById('tipoe').value,
                'nom': document.getElementById('nom').value,
                'desc': document.getElementById('desc').value,
                'fechastart': document.getElementById('fechastart').value,
                'fechaend': document.getElementById('fechaend').value,
                'estadotarea': estadotarea.value,
                'msj': document.getElementById('msj').value,
            }
            /* Luego se guardaen la funcion save exportada de la base de datos*/
            save(tarea)
            
                .then(() => {
                    /* luego de guardar se limpia y muestra el texto de que fue correcto*/
                    limpiar()
                    Swal.fire({
                        title: "Correcto",
                        text: "Datos guardados con éxito",
                        icon: "success",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "OK"
                    });
                })
                /* Si hay un error al ingresar los datos entonces mostrara mensaje de error, .catch atrapa el error*/
                .catch((error) => {
                    /* Mensaje de error en la consola */
                    const errorMessage = "Ocurrió un error al guardar los datos. Por favor, inténtalo de nuevo.";
                    console.error(errorMessage, error);
                    /*Mensaje de error visual*/
                    Swal.fire({
                        title: "Error",
                        text: "Ocurrió un error al guardar los datos. Por favor, inténtalo de nuevo.",
                        icon: "error",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "OK"
                    });
                });
        } 
        /* Sector que se encarga del upate*/
        else {
            const tarea = {
                'tipoe': document.getElementById('tipoe').value,
                'nom': document.getElementById('nom').value,
                'desc': document.getElementById('desc').value,
                'fechastart': document.getElementById('fechastart').value,
                'fechaend': document.getElementById('fechaend').value,
                'estadotarea': estadotarea.value,
                'msj': document.getElementById('msj').value
            }
            /* llama a la funcion update exportada de la base de datos y guarda / actualiza los datos */
            update(id, tarea)
                .then(() => {
                    /* Si es correcto muestra alerta de que fue correcto*/
                    limpiar()
                    Swal.fire({
                        title: "Correcto",
                        text: "Datos Actualizados con éxito!",
                        icon: "success",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "OK"
                        
                    });
                })
                /* Sino muestra alerta de que fue error */
                .catch((error) => {
                    const errorMessage = "Ocurrió un error al actualizar los datos. Por favor, inténtalo de nuevo.";
                    console.error(errorMessage, error);
                    Swal.fire({
                        title: "Error",
                        text: "Ocurrió un error al actualizar los datos. Por favor, inténtalo de nuevo.!",
                        icon: "error",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "OK"
                    });
                    id = 0
                })
        }
    }
})
/*Carga los datos a la tabla de la pagina */
window.addEventListener('DOMContentLoaded', () => {
    getData((collection) => {
        let tabla = ''
        /* estructura de la tabla que va a recorrer Collection (donde estan los datos),ademas existe el boton editar y eliminar*/
        collection.forEach((doc) => {
            const item = doc.data()
            tabla += `<tr>
            <td>${item.tipoe}</td>
            <td>${item.nom}</td>
            <td>${item.desc}</td>
            <td>${item.fechastart}</td>
            <td>${item.fechaend}</td>
            <td>${item.estadotarea}</td>
            <td>${item.msj}</td>
            <td nowrap>
                <button class="btn btn-warning" id="${doc.id}">Editar</button>
                <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
            </td>
        </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla
        document.querySelectorAll('.btn-danger').forEach(btn => {
            /*Si se presiona el boton eliminar (.btn-danger) mostrara mensaje y luego se borrara */
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Estás seguro de eliminar el registro?",
                    text: "No podrás revertir los cambios",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                })
                    /* Si fue un exito muestra cartel de registor eliminado con exito*/
                    .then((result) => {
                        if (result.isConfirmed) {
                            eliminar(btn.id)
                            Swal.fire({
                                title: "Eliminado",
                                text: "Su registro ha sido eliminado",
                                icon: "success"
                            })
                        }
                    })
                    /* Sino salta aleta de error de no poder borrar los datos*/
                    .catch((error) => {
                        const errorMessage = "Ocurrió un error al guardar los datos. Por favor, inténtalo de nuevo.";
                        console.error(errorMessage, error);
                        Swal.fire({
                            title: "Error",
                            text: "Ocurrió un error al guardar los datos. Por favor, inténtalo de nuevo.",
                            icon: "error",
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "OK"
                        })
                    })
            })
            /* Aqui ocurre la primera parte para actualizar los datos, se guardan los nuevos datos en variables*/
            document.querySelectorAll('.btn-warning').forEach(btn => {
                btn.addEventListener('click', async () => {
                    const doc = await obtener(btn.id)
                    const d = doc.data()
                    /* Actualiza los datos de la coleccion asignandole los nuevos  */
                    document.getElementById('tipoe').value = d.tipoe
                    document.getElementById('nom').value = d.nom
                    document.getElementById('desc').value = d.desc
                    document.getElementById('fechastart').value = d.fechastart
                    document.getElementById('fechaend').value = d.fechaend
                    document.getElementsByName('estadotarea').value = d.estadotarea
                    document.getElementById('msj').value = d.msj
                    /* Como nombre fue utilizado como llave primaria y que no se pueda repetir entonces solo se permtiira leer y no editar*/
                    document.getElementById('nom').readOnly = true
                    document.getElementById('btnGuardar').value = 'Modificar'

                    id = btn.id
                })
            })
        })
    })
})

