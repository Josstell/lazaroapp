import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import EXIF from "exif-js/exif"

import { nanoid } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"

import {
	CameraIcon,
	PlusIcon,
	LocationMarkerIcon,
} from "@heroicons/react/outline"
import ImageSlider from "../ImageSlider"
import { slideAdded } from "../../../store/slices/slides"

const FormPhotos = () => {
	const dispatch = useDispatch()
	const slidesData = useSelector((state) => state.slides)

	const [flag, setFlag] = useState(false)

	const router = useRouter()

	const filePicherRef = useRef(null)
	const captionRef = useRef(null)
	const [selectedFile, setSelectedFile] = useState([])

	const [info, setInfo] = useState([])
	const [gpsPosition, setGpsPosition] = useState([])
	const [nombreHerraje, setNombreHerraje] = useState("")
	const [nombreEstructura, setNombreEstructura] = useState("")
	const [numeroEstructura, setNumeroEstructura] = useState("")
	const [comentario, setComentario] = useState("")
	const [titleImage, setTitleImage] = useState("")
	const [decDeg, setDecDeg] = useState(false)

	const [arrayDatos, setArrayDatos] = useState([])

	const [objetoDatos, setObjetoDatos] = useState({})

	const [allImagesArray, setAllImagesArray] = useState([])
	const [currentImage, setCurrentImage] = useState(0)

	const addImageToPost = (e) => {
		let files = e.target.files

		let file

		for (let i = 0; i < files.length; i++) {
			let reader = new FileReader()
			file = files[i]
			let allMetaData
			reader.readAsDataURL(file)
			EXIF.getData(file, function () {
				allMetaData = EXIF.getAllTags(this)
				setInfo((prevState) => [...prevState, allMetaData])
			})

			reader.onload = (readerEvent) => {
				setSelectedFile((prevState) => [
					...prevState,
					{
						url: readerEvent.target.result,
						title: "",
						gps: {},
						uid: nanoid(),
					},
				])
			}
		}
	}

	const addTitleAndGpsToArrayImage = (e) => {
		e.preventDefault()
		setTitleImage(e.target.value)
		setSelectedFile((existingItems) => {
			return existingItems.map((item, index) => {
				return index === currentImage
					? {
							...item,
							title: e.target.value,
							gps: gpsPosition[index],
					  }
					: item
			})
		})
	}

	useEffect(() => {
		if (slidesData && flag) {
			router.push("/slides")
		}
	}, [slidesData])

	useEffect(() => {
		if (!decDeg) {
			setGpsPosition([])
			info.forEach((inf) =>
				setGpsPosition((prevState) => [
					...prevState,
					{
						latitude: inf?.GPSLatitude
							? transDegreeToDecimal({
									GPS: inf?.GPSLatitude,
									GPSRef: inf?.GPSLatitudeRef,
							  })
							: 0,
						longitude: inf?.GPSLongitude
							? transDegreeToDecimal({
									GPS: inf?.GPSLongitude,
									GPSRef: inf?.GPSLongitudeRef,
							  })
							: 0,
					},
				])
			)
		} else {
			setGpsPosition([])

			info.forEach((inf) =>
				setGpsPosition((prevState) => [
					...prevState,
					{
						latitude: inf?.GPSLatitude
							? transDegree({
									GPS: inf?.GPSLatitude,
									GPSRef: inf?.GPSLatitudeRef,
							  })
							: 0,
						longitude: inf?.GPSLongitude
							? transDegree({
									GPS: inf?.GPSLongitude,
									GPSRef: inf?.GPSLongitudeRef,
							  })
							: 0,
					},
				])
			)
		}
	}, [info, decDeg, selectedFile])

	const transDegreeToDecimal = ({ GPS, GPSRef }) => {
		const sign = 1
		const degree = GPS[0].numerator / GPS[0].denominator

		const min = GPS[1].numerator / (GPS[1].denominator * 60)
		const seg = GPS[2].numerator / (GPS[2].denominator * 3600)

		if (GPSRef === "W") {
			sign = -1
		}

		return parseFloat(` ${degree + min + seg}`) * sign
	}

	const transDegree = ({ GPS, GPSRef }) => {
		const degree = GPS[0].numerator / GPS[0].denominator

		const min = GPS[1].numerator / GPS[1].denominator
		const seg = GPS[2].numerator / GPS[2].denominator

		return degree + "° " + min + "' " + seg + "'' " + GPSRef
	}

	const savingData = (e) => {
		e.preventDefault()

		// 	{
		// 	Id: "23423",
		// 	images: [
		// 		{
		// 			url: "/images/test/DJI_0163.JPG",
		// 			title1: "",
		// 			title2: "",
		// 			gps: {
		// 				latitude: "18° 58' 36.807057657142856'' N",
		// 				longitude: "98° 26' 50.6802495'' W",
		// 			},
		// 		},
		// 		{
		// 			url: "/images/test/DJI_0471.JPG",
		// 			title1: "CAJA DE EMPALME 1",
		// 			title2: "ESTRUCTURA No. 68 A",
		// 			gps: {
		// 				latitude: "18° 58' 36.807057657142856'' N",
		// 				longitude: "98° 26' 50.6802495'' W",
		// 			},
		// 		},
		// 	],
		// 	herraje: "HERRAJE DE REMATE SENCILLO HRS",
		// 	estructura: "ESTRUCTURA EN SUBESTACIÓN ",

		// 	gps: {
		// 		latitude: `19°03'39.04" N`,
		// 		longitude: `98°00’56.25"W`,
		// 	},
		// },

		//Agregar al menos una imagen.

		setObjetoDatos({
			id: nanoid(),
			gps: gpsPosition,
			herraje: nombreHerraje,
			estructura: nombreEstructura,
			numeroEstructura: numeroEstructura,

			images: selectedFile,
			comentario,
		})

		dispatch(
			slideAdded({
				id: nanoid(),
				gps: gpsPosition,
				herraje: nombreHerraje,
				estructura: nombreEstructura,
				numeroEstructura: numeroEstructura,

				images: selectedFile,
				comentario,
			})
		)

		setArrayDatos([
			...arrayDatos,
			{
				gps: gpsPosition,
				herraje: nombreHerraje,
				estructura: nombreEstructura,
				numeroEstructura: numeroEstructura,
				images: selectedFile,
				comentario,
			},
		])

		setFlag(true)
	}

	const clearData = (e) => {
		e.preventDefault()
		setGpsPosition([])

		setSelectedFile([])
		setNombreHerraje("")
		setNombreEstructura("")
		setNumeroEstructura("")
		setComentario("")
	}
	console.log("Array datos: ")
	//
	console.log(arrayDatos)

	return (
		// <div className="text-xs	   min-h-[1024px] sm:min-h-screen pt-10 px-10 pb-20 text-center sm:block sm:p-0">
		<div
			className="flex-col justify-center items-center align-bottom  bg-white rounded-lg px-4 pt-4 pb-4 text-left overflow-hidden
		                shadow-xl transform transition-all sm:my-8  w-full  sm:align-middle md:w-3/5 sm:w-full sm:p-6 sm:mt-0 sm:mb-auto"
		>
			<div>
				{selectedFile.length > 0 ? (
					<div>
						<ImageSlider
							slides={selectedFile}
							setCurrentImage={setCurrentImage}
							filePicherRef={filePicherRef}
						/>
						<div className="absolute py-4 right-20 cursor-pointer">
							<PlusIcon
								className="h-6 w-6 text-teal-500 hover:text-teal-200"
								aria-hidden="true"
								onClick={() => filePicherRef.current.click()}
							/>
						</div>
					</div>
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
							multiple
							hidden
							onChange={(e) => addImageToPost(e)}
						/>
					</div>

					<div>
						<form className="flex-col align-items p-4">
							<div className="flex flex-wrap  align-items p-4">
								<label
									className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
									htmlFor="herraje"
								>
									Agregar titulo a la imagen:
								</label>
								<input
									id="titleImage"
									type="text"
									value={`${
										selectedFile[currentImage]?.title
											? selectedFile[currentImage]?.title
											: ""
									}`}
									onChange={addTitleAndGpsToArrayImage}
									placeholder="Agregar titulo de la imagen actual"
									className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
								/>
							</div>
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
									value={`${
										gpsPosition[currentImage]?.latitude
											? gpsPosition[currentImage]?.latitude
											: 0
									}`}
									readOnly
									//onChange={(e) => setComment(e.target.value)}
									placeholder="latitude"
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
									value={`${
										gpsPosition[currentImage]?.longitude
											? gpsPosition[currentImage].longitude
											: 0
									}`}
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
								onClick={clearData}
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
