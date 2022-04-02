import FormPhotos from "../components/FormPhotos"
import Sidebar from "../components/Sidebar"
import Slide from "../components/Slide"

import DropImage from "../components/Svg/DropImage"

import Layaut from "../components/Layaut"
import Table from "../components/Table"
import CardTable from "../components/Table/CardTable"

//import dynamic from "next/dynamic"

//const MapNoSSR = dynamic(() => import("../components/MapUsingPosition"))

export default function Home() {
	return (
		<Layaut>
			{/* <Table /> */}
			<CardTable />
		</Layaut>
	)
}
