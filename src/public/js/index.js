const socket = io();

let user;

Swal.fire({
    title: "Registrarse",
    input: "text",
    text: "Requerido el nombre de usuario",
    inputValidator: (value) => {
        return !value && 'Necesitas escribir un nombre de usuario';
    },
    allowOutsideClick: false,
    confirmButtonColor: '#d8b5ff'
}).then(resp => {
    user = resp.value;
    socket.emit('authenticated', user);
});

const chatBox = document.getElementById('chatBox');

const hanldeKeyUp = (evt) => {
    if (evt.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {
            socket.emit('message', { user: user, message: chatBox.value });
            chatBox.value = '';
        }
    }
};

chatBox.addEventListener('keyup', hanldeKeyUp);

socket.on('messageLogs', arrayMensajeServidor => {
    const log = document.querySelector('#messageLogs');
    let messages = '';
    arrayMensajeServidor.forEach(mensaje => {
        messages += `<li>Usuario: ${mensaje.user} - dice: ${mensaje.message}</li>`;
    });
    log.innerHTML = messages;
});

socket.on('newUserConnected', data => {
    if (!user) return;
    Swal.fire({
        title: `${data} se ha unido al chat`,
        icon: 'success',
        timer: 3000,
        showConfirmButton: false,
        toast: true,
        position: 'top-end'
    });
});

socket.on('userDisconnected', data => {
    if (!user) return;
    Swal.fire({
        title: `${data} se ha desconectado del chat`,
        icon: 'info',
        timer: 3000,
        showConfirmButton: false,
        toast: true,
        position: 'top-end'
    });
});