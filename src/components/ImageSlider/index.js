import React, { useState } from "react"

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline"

const ImageSlider = ({ slides, setCurrentImage, filePicherRef }) => {
	console.log(slides)
	const [current, setCurrent] = useState(0)

	const length = slides.length

	const nextSlide = () => {
		setCurrent(current === length - 1 ? 0 : current + 1)
		setCurrentImage(current === length - 1 ? 0 : current + 1)
	}

	const prevSlide = () => {
		setCurrent(current === 0 ? length - 1 : current - 1)
		setCurrentImage(current === 0 ? length - 1 : current - 1)
	}

	if (!Array.isArray(slides) || slides.length <= 0) {
		return null
	}

	return (
		<section className="relative w-full flex justify-center items-center">
			<ChevronLeftIcon
				className="absolute h-6 w-6  top-1/2 left-9 text-[3rem] text-black z-10 cursor-pointer select-none	"
				onClick={prevSlide}
			/>
			<ChevronRightIcon
				className="absolute h-6 w-6  top-1/2 right-9 text-[3rem] text-black z-10 cursor-pointer select-none"
				onClick={nextSlide}
			/>
			{slides.map((slide, index) => {
				return (
					<div
						className={
							index === current
								? "opacity-1 transition duration-1000 scale-110"
								: "opacity-0 transition ease-linear duration-1000 "
						}
						key={index}
						onClick={() => filePicherRef.current.click()}
					>
						{index === current && (
							<img
								src={slide.url}
								alt=""
								className="w-80 rounded-sm cursor-cell "
							/>
						)}
					</div>
				)
			})}
		</section>
	)
}

export default ImageSlider
