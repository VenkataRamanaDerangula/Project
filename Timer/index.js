document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.getElementById('timer-display');
    const startButton = document.getElementById('start-btn');
    const stopButton = document.getElementById('stop-btn');
    const resetButton = document.getElementById('reset-btn');

    let timerInterval;
    let elapsedTime = 0;

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    function updateDisplay() {
        timerDisplay.textContent = formatTime(elapsedTime);
    }

    function startTimer() {
        if (timerInterval) return; // Prevent multiple intervals
        timerInterval = setInterval(() => {
            elapsedTime++;
            updateDisplay();
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    function resetTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
        elapsedTime = 0;
        updateDisplay();
    }

    startButton.addEventListener('click', startTimer);
    stopButton.addEventListener('click', stopTimer);
    resetButton.addEventListener('click', resetTimer);
});
