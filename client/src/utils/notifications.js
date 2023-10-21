import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { Button } from "../components/ui/button"
import { PushAPI } from '@pushprotocol/restapi'

export const NotificationOptIn = async () => {
    console.log("subscribing...")
    const Pkey = `0x${process.env.NEXT_PUBLIC_PUSH_PRIVATE_KEY}`;
    const _signer = new ethers.Wallet(Pkey);

    const userAlice = await PushAPI.initialize(_signer, { env: 'staging' })

    const response = await userAlice.notification.subscribe(
        `eip155:5:0xa3670A55c11A4Bc444AF82bd17Cd1F4E67257167` // channel address in CAIP format
    )
    console.log(response)

    if (response.status == 204){
        return response.message;
    }
}

export const userSubscriptions = async () => {

    const Pkey = `0x${process.env.NEXT_PUBLIC_PUSH_PRIVATE_KEY}`;
    const _signer = new ethers.Wallet(Pkey);

    const userAlice = await PushAPI.initialize(_signer, { env: 'staging' })

    console.log("checking..")

    const aliceSubscriptions = await userAlice.notification.subscriptions()

    let subscribed = aliceSubscriptions.find((element) => element.channel == "0xa3670A55c11A4Bc444AF82bd17Cd1F4E67257167")

    console.log(aliceSubscriptions)

    if (subscribed) {
        return true
    } else {
        return false
    }
}

export async function fetchNotifications(address) {

    const Pkey = `0x${process.env.NEXT_PUBLIC_PUSH_PRIVATE_KEY}`;
    const _signer = new ethers.Wallet(Pkey);

    const userAlice = await PushAPI.initialize(_signer, { env: 'staging' })

    const notifications = await userAlice.notification.list(
        'INBOX',
        {
            account: `eip155:5:${address}`,
            channels: [`eip155:5:0xa3670A55c11A4Bc444AF82bd17Cd1F4E67257167`],
            limit: 14,
        },
    );

    console.log('Notifications: \n', notifications);
    return notifications
}

export const NotificationOptOut = async() => {

    console.log("unsubscribing...")
    const Pkey = `0x${process.env.NEXT_PUBLIC_PUSH_PRIVATE_KEY}`;
    const _signer = new ethers.Wallet(Pkey);

    const userAlice = await PushAPI.initialize(_signer, { env: 'staging' })

    const response = await userAlice.notification.unsubscribe(
        `eip155:5:0xa3670A55c11A4Bc444AF82bd17Cd1F4E67257167` // channel address in CAIP format
    )
    console.log(response)

    if (response.status == 204){
        return response.message;
    }

}

export const sendNotification = async (title, body) => {
    const Pkey = `0x${process.env.NEXT_PUBLIC_PUSH_PRIVATE_KEY}`;
    const _signer = new ethers.Wallet(Pkey);

    const userAlice = await PushAPI.initialize(_signer, { env: 'staging' });

    const recipients = ['*'];
    const notification = { title, body };

    try {
        const sendNotifRes = await userAlice.channel.send(recipients, { notification });
        console.log('Notification sent:', sendNotifRes);
    } catch (error) {
        console.error('Error sending notification:', error);
    }
}
