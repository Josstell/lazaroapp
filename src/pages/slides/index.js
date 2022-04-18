import { useSelector } from "react-redux"
import Layaut from "../../components/Layaut"
import Slide from "../../components/Slide"

import Carousel from "../../components/Carousel"
import { SliderData } from "../../components/ImageSlider/SliderData"

const data = [
	{
		Id: "23423",
		images: [
			{
				url: "/images/test/DJI_0163.JPG",
				title1: "",
				title2: "",
				gps: {
					latitude: "18° 58' 36.807057657142856'' N",
					longitude: "98° 26' 50.6802495'' W",
				},
			},
			{
				url: "/images/test/DJI_0471.JPG",
				title1: "CAJA DE EMPALME 1",
				title2: "ESTRUCTURA No. 68 A",
				gps: {
					latitude: "18° 58' 36.807057657142856'' N",
					longitude: "98° 26' 50.6802495'' W",
				},
			},
		],
		herraje: "HERRAJE DE REMATE SENCILLO HRS",
		estructura: "ESTRUCTURA EN SUBESTACIÓN ",

		gps: [
			{
				latitude: `19°03'39.04" N`,
				longitude: `98°00’56.25"W`,
			},
			{
				latitude: "18° 58' 36.807057657142856'' N",
				longitude: "98° 26' 50.6802495'' W",
			},
		],
	},
]

const featuredProducts = [
	"/images/DJI_0164.JPG",
	"/images/DJI_0471.JPG",
	"/images/DJI_0163.JPG",
]

export default function slides() {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const slidesData = useSelector((state) => state.slides)
	console.log(slidesData)

	return (
		<Layaut>
			<Carousel featuredProducts={slidesData} />
		</Layaut>
	)
}
