function captureItems(item) {
    return document.getElementById(`${item}`)
}

async function getCode(inputCode) {
    let divCode = captureItems('code')
    divCode.setAttribute('class', 'oculto')
    let loading = captureItems('loading')
    loading.innerHTML = 'Espere por favor...'
    let options = { method: 'POST', headers: { "Content-type": "application/json;charset=UTF-8" }, body: `{"token":"${inputCode}" }` };
    let res = await fetch('http://localhost:3000/getcode', options)
    res = await res.json()
    console.log(res)
        if (res.status) {
            if (!res.session) {
                loading.innerHTML = 'Escanea el codigo'
                let link=res.qrcode
                new QRious({
                    element: divCode,
                    value: link, // La URL o el texto
                    size: 400,
                    backgroundAlpha: 5, // 0 para fondo transparente
                    foreground: "black", // Color del QR
                    level: "L", // Puede ser L,M,Q y H (L es el de menor nivel, H el mayor)
                });
                divCode.setAttribute('class', 'imgcode')
    
            }else {
                loading.innerHTML = 'Sesion Iniciada'
            }
        } else {
            loading.innerHTML = 'Error Token incorrecto'
        }


}
let btnSendToken = captureItems('sendToken')
btnSendToken.addEventListener('click', () => {
    let inputCode = captureItems('token').value
    getCode(inputCode)
})
