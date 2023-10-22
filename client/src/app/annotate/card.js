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

export default function AnnotationCard({ id, labels, slug, image }) {

    const dispatch = useDispatch()
    const [label, setLabel] = useState("")
    const { address } = useAccount()

    const value = useSelector((state) => state.annotation.annotation)

    console.log(value)

    const insertAnnotations = (e) => {
        if ((value.filter((value) => value.imageId == id)).length > 0) {
            console.log("update")
            dispatch(updateAnnotations({ imageId: id, label: e.toLowerCase() }))
        } else {
            dispatch(setAnnotations({ imageId: id, label: e.toLowerCase() }))
        }
    }

    return (
        <Card className="w-[250px]">
            <div>
                <img className="rounded-lg" src={`https://ipfs.io/ipfs/${image}`} alt="logo" />
            </div>
            <CardHeader>
                <CardTitle>Image {id}</CardTitle>
                <CardDescription>Select label for the given image</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Label</Label>
                            <Select onValueChange={(e) => {
                                setLabel(e)
                                insertAnnotations(e)
                            }}>
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
        </Card>
    )
}