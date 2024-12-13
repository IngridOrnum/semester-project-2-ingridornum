export async function formatDateTime(isoString) {
    const date = new Date(isoString);

    const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    });

    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    return `${formattedDate} ${formattedTime}`;
}

// countdown.js
export function startCountdown(endTime, elementId) {
    const end = new Date(endTime);
    const countdownElement = document.getElementById(elementId);

    function updateCountdown() {
        const now = new Date();
        const timeLeft = end - now;
        if (timeLeft < 0) {
            clearInterval(timer);
            countdownElement.innerHTML = 'Auction has ended';
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m`;
    }

    updateCountdown(); // Update immediately on call
    const timer = setInterval(updateCountdown, 60000); // Update every minute

    return () => clearInterval(timer); // Return a cleanup function to stop the countdown
}
