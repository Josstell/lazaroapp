import { useState } from "react"
import Link from "next/link"

import {
	PresentationChartLineIcon,
	MapIcon,
	uploadIcon,
	UploadIcon,
} from "@heroicons/react/outline"

function Sidebar() {
	const [collapseShow, setCollapseShow] = useState(false)

	return (
		<div className="w-1/4 h-full shadow-md bg-white absolute">
			<div className="pt-4 pb-2 px-6">
				<Link href="/">
					<a>
						<div className="flex items-center">
							<div className="shrink-0">
								<img
									src="/images/logoCFE.svg"
									className="rounded-full w-10"
									alt="Avatar"
								/>
							</div>
							<div className="grow ml-3">
								<p className="text-sm font-semibold text-blue-600">Admin</p>
							</div>
						</div>
					</a>
				</Link>
			</div>
			<ul className="relative px-1">
				<li className="relative">
					<Link href="/upload-data">
						<a
							className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
							data-mdb-ripple="true"
							data-mdb-ripple-color="primary"
						>
							<div className=" w-3 h-3 mr-3 inset-y-0 pointer-events-none">
								<UploadIcon className="h-5 w-5 text-gray-500" />
							</div>
							<span>Subir foto</span>
						</a>
					</Link>
				</li>
				<li className="relative">
					<Link href="/slides">
						<a
							className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
							data-mdb-ripple="true"
							data-mdb-ripple-color="primary"
						>
							<div className=" w-3 h-3 mr-3 inset-y-0 pointer-events-none">
								<PresentationChartLineIcon className="h-5 w-5 text-gray-500" />
							</div>
							<span>Diapositivas</span>
						</a>
					</Link>
				</li>
				<li className="relative">
					<Link href="/map-position">
						<a
							className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
							data-mdb-ripple="true"
							data-mdb-ripple-color="primary"
						>
							<div className=" w-3 h-3 mr-3 inset-y-0 pointer-events-none">
								<MapIcon className="h-5 w-5 text-gray-500" />
							</div>
							<span>Mapa</span>
						</a>
					</Link>
				</li>
				{/* <li className="relative" id="sidenavSecEx2">
						<a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer">
							<svg
								aria-hidden="true"
								focusable="false"
								data-prefix="fas"
								className="w-3 h-3 mr-3"
								role="img"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 496 512"
							>
								<path
									fill="currentColor"
									d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"
								></path>
							</svg>
							<span>Collapsible item 1</span>
							<svg
								aria-hidden="true"
								focusable="false"
								data-prefix="fas"
								className="w-3 h-3 ml-auto"
								role="img"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 448 512"
							>
								<path
									fill="currentColor"
									d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
								></path>
							</svg>
						</a>
						<ul className="relative accordion-collapse collapse">
							<li className="relative">
								<a
									href="#!"
									className="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
									data-mdb-ripple="true"
									data-mdb-ripple-color="primary"
								>
									Link wkjvbne
								</a>
							</li>
							<li className="relative">
								<a
									href="#!"
									className="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
									data-mdb-ripple="true"
									data-mdb-ripple-color="primary"
								>
									ervkjekjv
								</a>
							</li>
						</ul>
					</li> */}
			</ul>
			<div className="text-center bottom-0 absolute w-full">
				<hr className="m-0" />
				<p className="py-2 text-sm text-gray-700">lazaroApp</p>
			</div>
		</div>
	)
}

export default Sidebar
