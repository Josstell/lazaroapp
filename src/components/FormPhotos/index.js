import { useEffect, useRef, useState } from "react"
import EXIF from "exif-js/exif"

import {
	CameraIcon,
	EmojiHappyIcon,
	LocationMarkerIcon,
} from "@heroicons/react/outline"

const FormPhotos = () => {
	const filePicherRef = useRef(null)
	const captionRef = useRef(null)
	const [selectedFile, setSelectedFile] = useState(null)

	const [info, setInfo] = useState({})
	const [gpsPosition, setGpsPosition] = useState({
		lattitude: 0,
		longitude: 0,
	})
	const [nombreHerraje, setNombreHerraje] = useState("")
	const [nombreEstructura, setNombreEstructura] = useState("")
	const [numeroEstructura, setNumeroEstructura] = useState("")
	const [comentario, setComentario] = useState("")
	const [decDeg, setDecDeg] = useState(false)

	const [arrayDatos, setArrayDatos] = useState([])

	const [objetoDatos, setObjetoDatos] = useState({})

	const addImageToPost = (e) => {
		const reader = new FileReader()

		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0])
			EXIF.getData(e.target.files[0], function () {
				var allMetaData = EXIF.getAllTags(this)
				setInfo(allMetaData)
			})
		}

		reader.onload = (readerEvent) => {
			setSelectedFile(readerEvent.target.result)
		}
	}

	useEffect(() => {
		if (!decDeg) {
			setGpsPosition({
				lattitude: info?.GPSLatitude
					? transDegree({
							GPS: info?.GPSLatitude,
							GPSRef: info?.GPSLatitudeRef,
					  })
					: 0,
				longitude: info?.GPSLongitude
					? transDegree({
							GPS: info?.GPSLongitude,
							GPSRef: info?.GPSLongitudeRef,
					  })
					: 0,
			})
		} else {
			setGpsPosition({
				lattitude: info?.GPSLatitude
					? transDegreeToDecimal({
							GPS: info?.GPSLatitude,
							GPSRef: info?.GPSLatitudeRef,
					  })
					: 0,
				longitude: info?.GPSLongitude
					? transDegreeToDecimal({
							GPS: info?.GPSLongitude,
							GPSRef: info?.GPSLongitudeRef,
					  })
					: 0,
			})
		}
	}, [info, decDeg])

	const transDegreeToDecimal = ({ GPS, GPSRef }) => {
		const sign = ""
		const degree = GPS[0].numerator / GPS[0].denominator

		const min = GPS[1].numerator / (GPS[1].denominator * 60)
		const seg = GPS[2].numerator / (GPS[2].denominator * 3600)

		if (GPSRef === "W") {
			sign = "-"
		}

		return `${sign} ${degree + min + seg}`
	}

	const transDegree = ({ GPS, GPSRef }) => {
		const degree = GPS[0].numerator / GPS[0].denominator

		const min = GPS[1].numerator / GPS[1].denominator
		const seg = GPS[2].numerator / GPS[2].denominator

		return degree + "° " + min + "' " + seg + "'' " + GPSRef
	}

	const savingData = (e) => {
		e.preventDefault()
		setObjetoDatos({
			gps: gpsPosition,
			herraje: nombreHerraje,
			estructura: {
				nombre: nombreEstructura,
				numero: numeroEstructura,
			},
			image: selectedFile,
			comentario,
		})

		setArrayDatos([
			...arrayDatos,
			{
				gps: gpsPosition,
				herraje: nombreHerraje,
				estructura: {
					nombre: nombreEstructura,
					numero: numeroEstructura,
				},
				image: selectedFile,
				comentario,
			},
		])
	}

	const clearData = (e) => {
		e.preventDefault()
		setGpsPosition({
			lattitude: 0,
			longitude: 0,
		})

		setSelectedFile(null)
		setNombreHerraje("")
		setNombreEstructura("")
		setNumeroEstructura("")
		setComentario("")
	}

	return (
		// <div className="text-xs	   min-h-[1024px] sm:min-h-screen pt-10 px-10 pb-20 text-center sm:block sm:p-0">
		<div
			className="flex-col justify-center items-center align-bottom  bg-white rounded-lg px-4 pt-4 pb-4 text-left overflow-hidden
		                shadow-xl transform transition-all sm:my-8  w-full  sm:align-middle md:w-3/5 sm:w-full sm:p-6 sm:mt-0 sm:mb-auto"
		>
			<div>
				{selectedFile ? (
					<img
						className="w-full object-contain cursor-pointer"
						src={selectedFile}
						onClick={() => setSelectedFile(null)}
					/>
				) : (
					<div
						onClick={() => filePicherRef.current.click()}
						className="mx-auto flex items-center justify-center h-12 w-12 rounded-full  bg-red-100 cursor-pointer"
					>
						<CameraIcon
							className="h-6 w-6 text-teal-500 hover:text-teal-200"
							aria-hidden="true"
						/>
					</div>
				)}
			</div>

			<div>
				<div className="mt-3 text-center sm-mt-5">
					<div>
						<input
							ref={filePicherRef}
							type="file"
							hidden
							onChange={(e) => addImageToPost(e)}
						/>
					</div>

					<div>
						<form className="flex-col align-items p-4">
							<div className="flex-col  flex-wrap justify-between p-4 ">
								{/* <div>
											<LocationMarkerIcon className="h-7 " />
										</div> */}

								<label className="md:w-2/3 block text-gray-500 font-bold">
									<input
										className="mr-2 leading-tight"
										type="checkbox"
										onClick={() => setDecDeg(!decDeg)}
									/>
									<span className="text-sm">GPS en formato decimal.</span>
								</label>
								<label
									className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
									htmlFor="herraje"
								>
									Latitude:
								</label>
								<input
									id="herraje"
									type="text"
									value={`${gpsPosition.lattitude}`}
									readOnly
									//onChange={(e) => setComment(e.target.value)}
									placeholder="lattitude"
									className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
								/>
								<label
									className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
									htmlFor="longitude"
								>
									Longitude:
								</label>
								<input
									id="longitude"
									type="text"
									value={`${gpsPosition.longitude}`}
									readOnly
									//	onChange={(e) => setComment(e.target.value)}
									placeholder="longitude"
									className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
								/>
							</div>
							<div className="flex flex-wrap  align-items p-4">
								<label
									className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
									htmlFor="herraje"
								>
									HERRAJE:
								</label>
								<input
									id="herraje"
									type="text"
									value={nombreHerraje}
									onChange={(e) => setNombreHerraje(e.target.value)}
									placeholder="Tipo de herraje"
									className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
								/>
							</div>
							<div className="flex flex-wrap  align-items p-4">
								<label
									className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
									htmlFor="estructura"
								>
									ESTRUCTURA:
								</label>
								<input
									id="estructura"
									type="text"
									value={nombreEstructura}
									onChange={(e) => setNombreEstructura(e.target.value)}
									placeholder="Tipo de estructura"
									className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
								/>
								<label
									className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
									htmlFor="numEstructura"
								>
									NUMERO:
								</label>
								<input
									id="numEstructura"
									type="text"
									value={numeroEstructura}
									onChange={(e) => setNumeroEstructura(e.target.value)}
									placeholder="Número de estructura"
									className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
								/>
							</div>

							<div className="flex flex-wrap  align-items p-4">
								<label
									className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
									htmlFor="comentario"
								>
									COMENTARIOS:
								</label>
								<input
									id="comentario"
									type="text"
									value={comentario}
									onChange={(e) => setComentario(e.target.value)}
									placeholder="Agregar algún comentario..."
									className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
								/>
							</div>
							<button
								className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
								type="button"
								onClick={(e) => savingData(e)}
							>
								Guardar
							</button>
							<button
								className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
								type="button"
								onClick={(e) => clearData(e)}
							>
								Cancelar
							</button>
						</form>
					</div>
				</div>
			</div>
			{/* <div className="mt-5 sm:mt-6">
						<button
							type="button"
							//	disabled={!selectedFile}
							className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm-tex-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
							//	onClick={() => uploadPost()}
						>
							Cargando
						</button>
					</div> 
                    */}
		</div>
		//</div>
	)
}

export default FormPhotos