import { AppThunk, persistor } from "store";

export const logout = ():AppThunk => async(dispatch) => {
  await persistor.purge();
  await persistor.purge();
  dispatch({ type: 'LOGOUT' })
}