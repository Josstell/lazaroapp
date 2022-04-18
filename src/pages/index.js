import { useSelector } from "react-redux"

import Layaut from "../components/Layaut"
import Table from "../components/Table"
import CardTable from "../components/Table/CardTable"

//import dynamic from "next/dynamic"

//const MapNoSSR = dynamic(() => import("../components/MapUsingPosition"))

export default function Home() {
	const slidesData = useSelector((state) => state.slides)

	console.log(slidesData)

	return (
		<Layaut>
			{/* <Table /> */}
			<CardTable />
		</Layaut>
	)
}
