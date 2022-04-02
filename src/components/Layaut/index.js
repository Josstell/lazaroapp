import React from "react"
import Sidebar from "../Sidebar"

const index = ({ children }) => {
	return (
		<div className="w-screen h-screen flex ">
			<div className="w-1/4 h-full bg-red-500">
				<Sidebar />
			</div>

			<div className="w-3/4  flex justify-center items-center overflow-y-auto">
				{children}
			</div>
		</div>
	)
}

export default index
