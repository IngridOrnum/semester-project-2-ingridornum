export async function formatDateTime(isoString) {
    const date = new Date(isoString);

    const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    });

    const formattedTime = date.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    return `${formattedDate} ${formattedTime}`;
}

export function timeRemaining(endsAt) {
    const currentTime = new Date();
    const auctionEndTime = new Date(endsAt);
    const timeDiff = auctionEndTime - currentTime;

    if (timeDiff <= 0) {
        return 'Auction ended';
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
        return `${days} days`;
    } else if (hours > 0) {
        return `${hours} hours & ${minutes} minutes`;
    } else {
        return `${minutes} minutes`;
    }
}

export function hasAuctionEnded(endsAt) {
    const currentTime = new Date();
    const auctionEndTime = new Date(endsAt);
    return currentTime > auctionEndTime;
}

export function getHighestBid(bids) {
    if (!bids || !bids.length) {
        return "0";
    }
    return Math.max(...bids.map(bid => bid.amount));
}