import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useDispatch, useSelector } from "react-redux"
import { setAnnotations, updateAnnotations } from '../../utils/annotationSlice'
import { useState } from "react"
import { useAccount } from "wagmi"

export default function AnnotationCard({ id, labels }) {

    const dispatch = useDispatch()
    const [label, setLabel] = useState("")
    const { address } = useAccount()

    const value = useSelector((state) => state.annotation.annotation)

    console.log(value)

    const insertAnnotations = () => {
        if ((value.filter((value) => value.imageId == `Image${id}_${address}`)).length > 0) {
            console.log("update")
            dispatch(updateAnnotations({ imageId: `Image${id}_${address}`, label: label.toLowerCase() }))
        } else {
            dispatch(setAnnotations({ imageId: `Image${id}_${address}`, label: label.toLowerCase() }))
        }
    }


    return (
        <Card className="w-[250px]">
            <div>
                <img className="rounded-lg" src="https://images.unsplash.com/photo-1682695795255-b236b1f1267d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="logo" />
            </div>
            <CardHeader>
                <CardTitle>Image {id}</CardTitle>
                <CardDescription>Select label for the given image</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        {/* <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name of your project" />
              </div> */}
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Label</Label>
                            <Select onValueChange={(e) => { setLabel(e) }}>
                                <SelectTrigger id="framework">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    {
                                        labels.map((value) => {
                                            return <SelectItem value={value}>{value}</SelectItem>
                                        })
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button onClick={() => { insertAnnotations() }}>Submit</Button>
            </CardFooter>
        </Card>
    )
}

export const data = [
    {
        id: 1,
        labels: ["hii", "hello", "bye"]
    },
    {
        id: 2,
        labels: ["hii", "helo", "bye"]
    },
    {
        id: 3,
        labels: ["hii", "hello", "byeee"]
    },
    {
        id: 4,
        labels: ["hi", "hello", "bye"]
    },
    {
        id: 5,
        labels: ["hiiii", "hello", "bye"]
    },
]