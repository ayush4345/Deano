import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
]

export default async function TableDemo() {

    const response = await fetch(
        "https://api.studio.thegraph.com/query/55477/deano-ranking/version/latest",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: `
            {
                moneySents {
                  _amount
                  _to
                  id
                  transactionHash
                }
                moneyReceiveds {
                  _amount
                  _from
                  transactionHash
                  id
                }
              }
        `,
            }),
        }
    );

    const result = await response.json();

    console.log(result.data)

    return (
        <>
            <div className="flex justify-center font-bold">
                <h1 className="bg-clip-text text-transparent bg-gradient-to-tr from-violet-900 to-gray-300 inline text-[40px] font-bold">
                    Rank List (Powered by The Graph)
                </h1>
            </div>
            <Table>
                <TableCaption className="font-semibold">A list of top Annotators on Deano</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Amount</TableHead>
                        <TableHead className="text-center">Annotator</TableHead>
                        <TableHead className="text-right">Transaction</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {result.data.moneySents.map((invoice) => (
                        <TableRow key={invoice.invoice}>
                            <TableCell className="font-medium">{parseInt(invoice._amount) / (10 ** 18)}</TableCell>
                            <TableCell className="text-center">{invoice._to}</TableCell>
                            <TableCell className="text-right hover:underline">
                                <a target="_blank" href={`https://mumbai.polygonscan.com/tx/${invoice.transactionHash}`}>Check Transaction</a>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Table>
                <TableCaption className="font-semibold">A list of top Vendors on Deano</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Amount</TableHead>
                        <TableHead className="text-center">Vendor</TableHead>
                        <TableHead className="text-right">Transaction</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {result.data.moneyReceiveds.map((invoice) => (
                        <TableRow key={invoice.invoice}>
                            <TableCell className="font-medium">{parseInt(invoice._amount)}</TableCell>
                            <TableCell className="text-center">{invoice._from}</TableCell>
                            <TableCell className="text-right hover:underline">
                                <a target="_blank" href={`https://mumbai.polygonscan.com/tx/${invoice.transactionHash}`}>Check Transaction</a>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>

    )
}
