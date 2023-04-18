import { useSelector } from "react-redux"
import FlexBetween from "../../components/FlexBetween"

const Login = ( ) => {
    const user = useSelector((state) => state.user)
    console.log("user", user)

    
    return (<>
        <FlexBetween>Hello World! Login Page</FlexBetween>
    </>)
}

export default Login