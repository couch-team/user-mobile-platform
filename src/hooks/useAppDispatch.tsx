import { useDispatch } from "react-redux"
import { AppDispatch } from "store";

const useAppDispatch = () => {
    return useDispatch<AppDispatch>()
}
export default useAppDispatch;