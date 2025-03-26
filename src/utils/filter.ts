import { HumanReadableEvent, TEventData } from "@/types/event";

export function filterMyTransactions(events: TEventData[], currentUserAddress: string): TEventData[] {
    const lowerCurrentUser = currentUserAddress.toLowerCase();
    
    return events.filter(event => {
        switch (event?.type) {
            case "MintTree":
                return event?.owner?.toLowerCase() === lowerCurrentUser;
            case "BurnTree":
                return event?.owner?.toLowerCase() === lowerCurrentUser;
            case "ChangeOwner":
                return event?.oldOwner?.toLowerCase() === lowerCurrentUser || 
                       event?.newOwner?.toLowerCase() === lowerCurrentUser;
            case "NewTransaction":
                return event?.sender?.toLowerCase() === lowerCurrentUser || 
                       event?.recipient?.toLowerCase() === lowerCurrentUser;
            default:
                return false;
        }
    });
}


export function toHumanReadableEvents(events: TEventData[], currentUserAddress: string): HumanReadableEvent[] {
    const lowerCurrentUser = currentUserAddress.toLowerCase();

    return events.map(event => {
        let message = '';
        let color: 'green' | 'red' = 'green';
        let icon = '';

        const isUserInvolved = (address: string | undefined) => address?.toLowerCase() === lowerCurrentUser;

        switch (event?.type) {
            case "MintTree":
                color = 'green';
                icon = '🌱';
                message = isUserInvolved(event?.owner) 
                    ? `You planted a new tree at (${(event?.latitude ?? 0) / 10000}, ${(event?.longitude ?? 0) / 10000})`
                    : `${event?.owner} planted a new tree at (${event?.latitude}, ${event?.longitude})`;
                break;

            case "BurnTree":
                color = 'red';
                icon = '🔥';
                message = isUserInvolved(event?.owner)
                    ? `You removed your tree (ID: ${event?.tokenId}) at (${event?.latitude}, ${event?.longitude})`
                    : `${event?.owner} removed their tree (ID: ${event?.tokenId})`;
                break;

            case "ChangeOwner":
                const isNewOwner = isUserInvolved(event?.newOwner);
                color = isNewOwner ? 'green' : 'red';
                icon = isNewOwner ? '🔄' : '➡️';
                if (isUserInvolved(event?.oldOwner)) {
                    message = `You transferred tree ownership to ${event?.newOwner}`;
                } else if (isUserInvolved(event?.newOwner)) {
                    message = `You received tree ownership from ${event?.oldOwner}`;
                } else {
                    message = `${event?.oldOwner} transferred ownership to ${event?.newOwner}`;
                }
                break;

            case "NewTransaction":
                const isRecipient = isUserInvolved(event?.recipient);
                color = isRecipient ? 'green' : 'red';
                icon = isRecipient ? '⬇️' : '⬆️';
                if (isUserInvolved(event?.sender)) {
                    message = `You sent ${event?.amount} tokens to ${event?.recipient}`;
                } else if (isUserInvolved(event?.recipient)) {
                    message = `You received ${event?.amount} tokens from ${event?.sender}`;
                } else {
                    message = `${event?.sender} sent ${event?.amount} tokens to ${event?.recipient}`;
                }
                break;

            default:
                message = 'Unknown event occurred';
                icon = '❓';
        }

        return {
            message,
            color,
            icon,
            timestamp: event?.blockNumber
        };
    });
}