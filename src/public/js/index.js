const socket = io()

let user
Swal.fire({
    title: "Registrarse",
    input: "text",
    text: "Requerido el nombre de usuario",
    inputValidator: (value) => {
        return !value && 'Necesitas escribir un nombre de usuario'
    },
    allowOutsideClick: false
}).then(resp => {
    user = resp.value;
    socket.emit('authenticated', user)
})

let chatBox = document.getElementById('chatBox')
const hanldeKeyUp = (evt) => {
    if (evt.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {
            socket.emit('message', {user: user, message: chatBox.value})
            chatBox.value = ''
        }
    }
}
chatBox.addEventListener('keyup', hanldeKeyUp)
socket.on('messageLogs', arrayMensajeServidor => {
    let log = document.querySelector('#messageLogs')
    let messages = ''
    arrayMensajeServidor.forEach(mensaje => {
        messages += `<li>Usuario: ${mensaje.user} - dice: ${mensaje.message}</li>` 
    })
    log.innerHTML = messages
})

socket.on('newUserConnected', data => {
    if(!user) return;
    Swal.fire({
        toast:true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        title: `${data} se ha unido al chat`,
        icon: 'success'
    })
})