import { createSlice } from "@reduxjs/toolkit"

const initialState = [
	{
		id: "0qw",
		gps: [
			{
				latitude: 18.976890849349203,
				longitude: -98.44741118041667,
			},
			{
				latitude: 18.996890849349203,
				longitude: -97.44741118041667,
			},
		],
		numeroEstructura: "242",
		herraje: "HERRAJE DE REMATE SENCILLO HRS",
		estructura: "ESTRUCTURA EN SUBESTACIÓN ",
		images: [
			{
				uid: 0,
				url: "/images/test/DJI_0471.JPG",
				title: "CAJA DE EMPALME 1",
				gps: {
					latitude: 18.976890849349203,
					longitude: -98.44741118041667,
				},
			},
			{
				uid: 1,
				url: "/images/test/DJI_0471.JPG",
				title: "CAJA DE EMPALME 1",
				gps: {
					latitude: 18.996890849349203,
					longitude: -97.44741118041667,
				},
			},
		],
		comentario: "Todo bien.",
	},
	{
		id: "0q",
		gps: [
			{
				latitude: 19.0453209,
				longitude: -98.209254,
			},
			{
				latitude: 18.996890849349203,
				longitude: -97.44741118041667,
			},
		],
		numeroEstructura: "242",
		herraje: "HERRAJE DE REMATE SENCILLO HRS",
		estructura: "ESTRUCTURA EN SUBESTACIÓN ",
		images: [
			{
				uid: 0,
				url: "/images/test/DJI_0471.JPG",
				title: "CAJA DE EMPALME 1",
				gps: {
					latitude: 18.976890849349203,
					longitude: -98.44741118041667,
				},
			},
			{
				uid: 1,
				url: "/images/test/DJI_0471.JPG",
				title: "CAJA DE EMPALME 1",
				gps: {
					latitude: 18.996890849349203,
					longitude: -97.44741118041667,
				},
			},
		],
		comentario: "Todo bien.",
	},
]

const slidesSlice = createSlice({
	name: "slides",
	initialState,
	reducers: {
		slideAdded: {
			reducer(state, action) {
				state.push(action.payload)
			},
		},
	},
})

export const { slideAdded } = slidesSlice.actions

export default slidesSlice.reducer
