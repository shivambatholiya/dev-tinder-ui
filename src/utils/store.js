import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice.js'
import feedReducer from '../features/feed/feedSlice.js'
import connectionReducer from '../features/connection/connectionSlice.js'
import requestReducer from '../features/request/requestSlice.js'

const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionReducer,
    requests: requestReducer,
  },
})

export default store