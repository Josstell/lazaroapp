import React from "react"

import Layaut from "../../components/Layaut"

import Map from "../../components/Map"

import styles from "../../styles/Home.module.css"

const DEFAULT_CENTER = [38.907132, -77.036546]

const index = () => {
	return (
		<Layaut>
			<Map className={styles.homeMap} center={DEFAULT_CENTER} zoom={12}>
				{({ TileLayer, Marker, Popup }) => (
					<>
						<TileLayer
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						/>
						<Marker position={DEFAULT_CENTER}>
							<Popup>
								A pretty CSS3 popup. <br /> Easily customizable.
							</Popup>
						</Marker>
					</>
				)}
			</Map>
		</Layaut>
	)
}
export default index
