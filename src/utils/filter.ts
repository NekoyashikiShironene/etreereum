import { HumanReadableEvent, TEventData } from "@/types/event";

export function filterMyTransactions(events: TEventData[], currentUserAddress: string, role: string): TEventData[] {
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
            
            case "MintTree":
            case "BurnTree":
                return (role === "user" && event.from?.toLowerCase() === lowerCurrentUser) || role !== "user";
            default:
                return false;
        }
    });
}


export function toHumanReadableEvents(events: TEventData[], currentUserAddress: string, role: string): HumanReadableEvent[] {
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
                    ? `You planted a new tree at (${(event?.latitude ?? 0) / 10e6}, ${(event?.longitude ?? 0) / 10e6})`
                    : `${event?.owner} planted a new tree at (${(event?.latitude ?? 0) / 10e6}, ${(event?.longitude ?? 0) / 10e6})`;
                break;

            case "BurnTree":
                color = 'red';
                icon = '🔥';
                message = isUserInvolved(event?.owner)
                    ? `Your tree was burnt (ID: ${event?.tokenId}) at (${(event?.latitude ?? 0) / 10e6}, ${(event?.longitude ?? 0) / 10e6})`
                    : `${event?.owner}'s tree was burnt (ID: ${event?.tokenId}) at (${(event?.latitude ?? 0) / 10e6}, ${(event?.longitude ?? 0) / 10e6})`;
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

            case "MintToken":
                color = "green";
                icon = "💰";
                if (isUserInvolved(event?.from)) {
                    message = `You minted ${event?.amount} ETR`;
                } else {
                    message = `${event?.from} minted ${event?.amount} ETR`;
                }
                
                break;

            case "BurnToken":
                color = "red";
                icon = "🔥";
                if (isUserInvolved(event?.from)) {
                    message = `You burned ${event?.amount} ETR`;
                } else {
                    message = `${event?.from} burned ${event?.amount} ETR`;
                }
                message = "";
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