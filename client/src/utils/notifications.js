import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { Button } from "../components/ui/button"
import { PushAPI } from '@pushprotocol/restapi'

export const NotificationOptIn = async () => {

    const Pkey = `0x${process.env.NEXT_PUBLIC_PUSH_PRIVATE_KEY}`;
    const _signer = new ethers.Wallet(Pkey);

    const userAlice = await PushAPI.initialize(_signer, { env: 'staging' })

    await userAlice.notification.subscribe(
        `eip155:5:0xa3670A55c11A4Bc444AF82bd17Cd1F4E67257167` // channel address in CAIP format
    )

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
            limit:14,
        },
    );

    console.log('Notifications: \n', notifications);
    return notifications
}

export const NotificationOptOut = () => {

    const { address } = useAccount()

    const Pkey = `0x${process.env.NEXT_PUBLIC_PUSH_PRIVATE_KEY}`;
    const _signer = new ethers.Wallet(Pkey);

    const OptOut = async () => {

        await PushAPI.channels.unsubscribe({
            signer: _signer,
            channelAddress: 'eip155:5:0x2D449c535E4B2e07Bc311fbe1c14bf17fEC16AAb', // channel address in CAIP
            userAddress: `eip155:5:${address}`, // user address in CAIP
            onSuccess: () => {
                console.log('opt out success');
            },
            onError: () => {
                console.error('opt out error');
            },
            env: 'staging'
        })
    }

    return (
        <>
            <Button variant="contained" className="bg-sky-600 mr-3" onClick={OptOut}>Opt Out</Button>
        </>
    )

}

