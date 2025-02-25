document.addEventListener("DOMContentLoaded", () => {
    const cameraView = document.getElementById("camera-view");
    const feed = document.getElementById("feed");
    const camera = document.getElementById("camera");

    // Habilitar la cámara
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            camera.srcObject = stream;
        })
        .catch(error => {
            console.error("Error al acceder a la cámara:", error);
        });

    // Swipe para cambiar entre la cámara y el feed
    let startX;
    document.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    });

    document.addEventListener("touchend", (e) => {
        let endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) {
            // Deslizar a la izquierda -> Mostrar feed
            cameraView.style.transform = "translateX(-100%)";
            feed.style.transform = "translateX(0)";
        } else if (endX - startX > 50) {
            // Deslizar a la derecha -> Mostrar cámara
            cameraView.style.transform = "translateX(0)";
            feed.style.transform = "translateX(100%)";
        }
    });
});
