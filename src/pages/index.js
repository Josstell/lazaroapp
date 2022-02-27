import CardPhoto from "../components/CardPhoto"

import DropImage from "../components/Svg/DropImage"

export default function Home() {
	return (
		<div>
			{/* <div className="border-dashed border-2 w-64 h-32 rounded flex justify-center items-center">
				<DropImage />
				<span className="block text-grey">Drop your files here</span>
			</div> */}
			<CardPhoto />
		</div>
	)
}
