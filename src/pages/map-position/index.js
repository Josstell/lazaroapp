/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import Layaut from "../../components/Layaut"

import Map from "../../components/Map"

import styles from "../../styles/Home.module.css"

const mapPosition = () => {
	const slidesData = useSelector((state) => state.slides)
	console.log(slidesData)

	const [DEFAULT_CENTER, setDEFAULT_CENTER] = useState([])

	const [imageMarkers, setImageMarkers] = useState([])

	const getLatOrLon = (image) => {
		console.log("actual", image.gps)
		setImageMarkers((prevState) => [...prevState, image.gps])
	}

	useEffect(() => {
		const images = []

		slidesData.forEach((slide) => {
			slide.images.forEach((image) =>
				images.push([...images, { uid: image.uid }])
			)
		})
		console.log("hola :", images)
	}, [slidesData])

	console.log("position", slidesData)

	return (
		<Layaut>
			<Map
				className={styles.homeMap}
				center={[19.0453209, -98.209254]}
				zoom={12}
			>
				{({ TileLayer, Marker, Popup }) => (
					<>
						<TileLayer
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						/>

						{slidesData.map((location) => (
							<Marker
								key={location.id}
								position={[location.gps[0].latitude, location.gps[0].longitude]}
							>
								<Popup>
									{location.herraje} <br />
								</Popup>
							</Marker>
						))}
					</>
				)}
			</Map>
		</Layaut>
	)
}
export default mapPosition

{
	/* 	{slidesData.forEach((posit) => {
							console.log(posit.herraje)
							return posit.images.map((pos) => {
								console.log(pos.gps.latitude, pos.title)
								return (
									<Marker
										key={pos.uid}
										position={[18.976890849349203, -98.44741118041667]}
									>
										<Popup>
											{pos.title} <br />
										</Popup>
									</Marker>
								)
							})
						})} */
}
