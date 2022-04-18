import React from "react"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"

// components

//import TableDropdown from "components/Dropdowns/className.js";

export default function CardTable({ color }) {
	const slidesData = useSelector((state) => state.slides)

	console.log(slidesData)

	return (
		<div className="w-[80vw] h-[90vh]">
			<div
				className={
					"relative  flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded sm:mt-0 sm:mb-auto" +
					(color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
				}
			>
				<div className="rounded-t mb-0 px-4 py-3 border-0">
					<div className="flex flex-wrap items-center">
						<div className="relative w-full px-4 max-w-full flex-grow flex-1">
							<h3
								className={
									"font-semibold text-lg " +
									(color === "light" ? "text-blueGray-700" : "text-white")
								}
							>
								Datos
							</h3>
						</div>
					</div>
				</div>
				<div className="block w-full overflow-x-auto">
					{/* Projects table */}
					<table className="items-center w-full bg-transparent border-collapse">
						<thead>
							<tr>
								<th
									className={
										"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
										(color === "light"
											? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
											: "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
									}
								>
									Id
								</th>
								<th
									className={
										"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
										(color === "light"
											? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
											: "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
									}
								>
									Herraje
								</th>
								<th
									className={
										"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
										(color === "light"
											? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
											: "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
									}
								>
									Numero estructura
								</th>
								<th
									className={
										"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
										(color === "light"
											? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
											: "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
									}
								>
									Editar
								</th>
								<th
									className={
										"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
										(color === "light"
											? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
											: "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
									}
								>
									Borrar
								</th>
								<th
									className={
										"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
										(color === "light"
											? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
											: "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
									}
								></th>
							</tr>
						</thead>
						<tbody>
							{slidesData.map((slide) => (
								<tr key={slide.id}>
									<th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
										<span
											className={
												"ml-3 font-bold " +
												+(color === "light"
													? "text-blueGray-600"
													: "text-white")
											}
										>
											{slide.id}
										</span>
									</th>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										{slide.herraje}
									</td>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										<i className="fas fa-circle text-orange-500 mr-2"></i>{" "}
										{slide.numeroEstructura}
									</td>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										<div className="flex">
											{slide.images.map((img) => (
												<img
													key={img.uid}
													src={img.url}
													alt="..."
													className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"
												></img>
											))}
										</div>
									</td>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										{/* <div className="flex items-center">
											<span className="mr-2">60%</span>
											<div className="relative w-full">
												<div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
													<div
														style={{ width: "60%" }}
														className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
													></div>
												</div>
											</div>
										</div> */}
									</td>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
										{/* <className /> */}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

CardTable.defaultProps = {
	color: "light",
}

CardTable.propTypes = {
	color: PropTypes.oneOf(["light", "dark"]),
}
