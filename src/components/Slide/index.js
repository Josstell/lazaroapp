import Image from "next/image"

function Slide({ target }) {
	console.log(target)
	return (
		<div className="flex-col justify-between m-2 p-4 bg-gray-100 shadow-lg  w-full h-full ">
			{/* header */}
			<div className="flex items-center h-1/6">
				<div className="relative w-1/5 h-full  ">
					<img
						src="/images/logoCFE.svg"
						alt=""
						className="w-80 rounded-sm cursor-cell "
					/>
				</div>
				<div className="pl-2 pt-6">
					<h2 className="p-0 -mb-2 text-green-600 font-extrabold text-lg italic">
						Distribución
					</h2>
					<h3 className="p-0 -mb-2 text-gray-500 font-semibold text-sm italic">
						Centro Oriente
					</h3>
				</div>
			</div>

			{/* title */}
			<div className="flex justify-center ">
				<h1 className="mt-2 text-green-300 px-2 border-2 border-green-200 ">
					{target?.herraje}
				</h1>
			</div>

			{/* photos border-2	border-red-600 */}
			<div className="flex justify-evenly align-center	 w-full h-3/5">
				{/* <div className="relative w-1/3	 h-full ">
				
				</div> */}
				{target.images?.map((img, index) => (
					<div key={index} className="relative w-1/3	 h-full">
						{img.title !== "" ? (
							<>
								<p className="mb pt-4 px-10 text-xs text-green-500 font-semibold">
									{img.title}
								</p>
								<div className="relative h-3/5 m-0 p-0 ">
									{/* <Image
										src={img.url}
										alt=""
										layout="fill"
										objectFit="contain"
									/> */}
									<img
										src={img.url}
										alt=""
										className="w-80 rounded-sm cursor-cell "
									/>
								</div>
								<p
									className={`${
										img.title2 !== ""
											? "mt px-10 text-[10px] text-green-500 font-semibold border border-blue-700"
											: "mt px-10 text-[10px] text-green-500 font-semibold"
									}`}
								>
									{img.title2}
								</p>
							</>
						) : (
							<img
								src={img.url}
								alt=""
								className="w-80 rounded-sm cursor-cell "
							/>
						)}
					</div>
				))}
			</div>

			{/* Herraje */}
			<div className="flex justify-evenly mb-5">
				<h2 className=" px-4 text-sm  text-green-500 font-semibold border border-blue-700">
					{target?.estructura}
				</h2>
				<h3 className="text-green-500 text-xs py-2 ">
					{target.gps?.latitude}, {target.gps?.longitude}
				</h3>
			</div>

			{/* header */}
			<div className="border-t-4 border-green-800 "></div>
		</div>
	)
}

export default Slide
