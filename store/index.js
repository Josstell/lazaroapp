import { configureStore } from "@reduxjs/toolkit"
import slidesReducer from "./slices/slides"

export default configureStore({
	reducer: {
		slides: slidesReducer,
	},
})
