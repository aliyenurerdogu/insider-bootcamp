let countdown;
let timeLeft;

document.querySelector('#startButton').addEventListener('click', () => {
    clearInterval(countdown);
    timeLeft = parseInt($('#timeInput').val());
    if (isNaN(timeLeft) || timeLeft <= 0) {
        alert("Lütfen geçerli bir sayı girin!");
        return;
    }
    updateDisplay();

    countdown = setInterval(() => {
        timeLeft--;
        updateDisplay();
        if (timeLeft <= 0) {
            clearInterval(countdown);
            $('#countdownDisplay').text("Süre Doldu!");
        }
    }, 1000);
});

document.querySelector('#resetButton').addEventListener('click', () => {
    clearInterval(countdown);
    $('#countdownDisplay').text("");
});

const updateDisplay = () => {
    $('#countdownDisplay').text(`Geri Sayım: ${timeLeft} saniye`);
}