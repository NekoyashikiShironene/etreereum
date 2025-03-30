import { HumanReadableEvent, TEventData } from "@/types/event";

export function filterMyTransactions(events: TEventData[], currentUserAddress: string, role: string): TEventData[] {
    const lowerCurrentUser = currentUserAddress.toLowerCase();

    return events.filter(event => {
        switch (event?.type) {
            case "GrantAdmin":
            case "RevokeAdmin":
                return event?.account?.toLowerCase() === lowerCurrentUser ||
                    event?.sender?.toLowerCase() === lowerCurrentUser;
            case "MintTree":
            case "BurnTree":
                return event?.owner?.toLowerCase() === lowerCurrentUser ||
                    event?.sender?.toLowerCase() === lowerCurrentUser;
            case "MintToken":
            case "BurnToken":
                return event.from?.toLowerCase() === lowerCurrentUser;
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


export function toHumanReadableEvents(events: TEventData[], currentUserAddress: string, role: string): HumanReadableEvent[] {
    const lowerCurrentUser = currentUserAddress.toLowerCase();

    return events.map(event => {
        let message = '';
        let color: 'green' | 'red' = 'green';
        let icon = '';

        const isUserInvolved = (address: string | undefined) => address?.toLowerCase() === lowerCurrentUser;

        switch (event?.type) {
            case "GrantAdmin":
                color = 'green';
                icon = '🛡️';
                if (isUserInvolved(event?.account)) {
                    message = `You have been granted admin privileges by ${event?.sender}`;
                } else if (isUserInvolved(event?.sender)) {
                    message = `You granted admin privileges to ${event?.account}`;
                } else {
                    message = `${event?.sender} granted admin privileges to ${event?.account}`;
                }
                break;


            case "RevokeAdmin":
                color = 'red';
                icon = '⚠️';
                if (isUserInvolved(event?.account))
                    message = `Your admin privileges have been revoked by ${event?.sender}`;
                else if (isUserInvolved(event?.sender))
                    message = `You revoked admin privileges from ${event?.account}`;
                else
                    message = `${event?.sender} revoked admin privileges from ${event?.account}`;

                break;


            case "MintTree":
                color = 'green';
                icon = '🌱';
                if (isUserInvolved(event?.owner))
                    message = `You planted a new tree at (${(event?.latitude ?? 0) / 10e6}, ${(event?.longitude ?? 0) / 10e6})`
                else if (isUserInvolved(event?.sender))
                    message = `You assigned a tree minting to ${event?.owner} at (${(event?.latitude ?? 0) / 10e6}, ${(event?.longitude ?? 0) / 10e6})`;
                else
                    message = `${event?.owner} planted a new tree at (${(event?.latitude ?? 0) / 10e6}, ${(event?.longitude ?? 0) / 10e6})`;
                break;

            case "BurnTree":
                color = 'red';
                icon = '🔥';
                if (isUserInvolved(event?.owner))
                    message = `You burned your tree at (${(event?.latitude ?? 0) / 10e6}, ${(event?.longitude ?? 0) / 10e6})`;
                else if (isUserInvolved(event?.sender))
                    message = `You removed ${event?.owner}'s tree at (${(event?.latitude ?? 0) / 10e6}, ${(event?.longitude ?? 0) / 10e6})`;
                else
                    message = `${event?.owner} burned their tree at (${(event?.latitude ?? 0) / 10e6}, ${(event?.longitude ?? 0) / 10e6})`;
                break;


            case "MintToken":
                color = 'green';
                icon = '💰';
                if (isUserInvolved(event?.from))
                    message = `You minted ${event?.amount} ETR`;
                else if (isUserInvolved(event?.sender))
                    message = `You granted ${event?.amount} ETR to ${event?.from}`;
                else
                    message = `${event?.from} minted ${event?.amount} ETR`;

                break;


            case "BurnToken":
                color = 'red';
                icon = '🔥';
                if (isUserInvolved(event?.from))
                    message = `You burned ${event?.amount} ETR`;
                else if (isUserInvolved(event?.sender))
                    message = `You removed ${event?.amount} ETR from ${event?.from}`;
                else
                    message = `${event?.from} burned ${event?.amount} ETR`;

                break;


            case "ChangeOwner":
                const isNewOwner = isUserInvolved(event?.newOwner);
                color = isNewOwner ? 'green' : 'red';
                icon = isNewOwner ? '🔄' : '➡️';
                if (isUserInvolved(event?.oldOwner))
                    message = `You transferred tree ownership to ${event?.newOwner}`;
                else if (isUserInvolved(event?.newOwner))
                    message = `You received tree ownership from ${event?.oldOwner}`;
                else
                    message = `${event?.oldOwner} transferred ownership to ${event?.newOwner}`;

                break;

            case "NewTransaction":
                const isRecipient = isUserInvolved(event?.recipient);
                color = isRecipient ? 'green' : 'red';
                icon = isRecipient ? '⬇️' : '⬆️';
                if (isUserInvolved(event?.sender))
                    message = `You sent ${event?.amount} tokens to ${event?.recipient}`;
                else if (isUserInvolved(event?.recipient))
                    message = `You received ${event?.amount} tokens from ${event?.sender}`;
                else
                    message = `${event?.sender} sent ${event?.amount} tokens to ${event?.recipient}`;

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