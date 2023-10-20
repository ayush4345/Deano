import { CheckIfAnnotator } from "../tableland/UserType"
import { CheckIfVendor } from "../tableland/UserType"
import { useSelector, useDispatch } from 'react-redux'
import { setUserType, setUserAddress, setUserName } from './userSlice'
import { useRouter } from 'next/navigation'

export default async function CheckIfUser(address) {

    // const dispatch = useDispatch()
    // const router = useRouter()

    const result = await CheckIfAnnotator(address)

    // if (result.length > 0) {
    //     dispatch(setUserType("Annotator"))
    //     dispatch(setUserAddress(address))
    //     return
    // }
    console.log(result)

    const result2 = await CheckIfVendor(address)

    // if (result2.length > 0) {
    //     dispatch(setUserType("Vendor"))
    //     dispatch(setUserAddress(address))
    //     return
    // } else {
    //     router.push("/register")
    // }
    console.log(result2)
}