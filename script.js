document.addEventListener("DOMContentLoaded", () => {
    const cameraView = document.getElementById("camera-view");
    const feed = document.getElementById("feed");
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
    });

    document.addEventListener("touchmove", (e) => {
        touchEndX = e.touches[0].clientX;
    });

    document.addEventListener("touchend", () => {
        if (touchStartX - touchEndX > 50) {
            cameraView.style.transform = "translateX(-100%)";
            feed.style.transform = "translateX(0)";
        } else if (touchEndX - touchStartX > 50) {
            cameraView.style.transform = "translateX(0)";
            feed.style.transform = "translateX(100%)";
        }
    });

    // Habilitar la cámara
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                document.getElementById("camera").srcObject = stream;
            })
            .catch((err) => {
                console.error("Error al acceder a la cámara: ", err);
            });
    }
});
