"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";

const images = [
  "/slideImages/bene.png",
  "/slideImages/guni.png",
  "/slideImages/gus.png",
  "/slideImages/yz.png",
];

const Slider = () => {
  return (
    <div className="flex gap-10 justify-center max-sm:flex-col bg-background w-full">
      <div className="w-full max-w-5xl flex flex-col justify-between md:flex-row gap-8 md:gap-4 overflow-x-hidden">
        <Swiper
          spaceBetween={30}
          loop={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="mySwiper cursor-pointer w-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="w-full flex justify-center">
                <Image
                  rel="values"
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-[80%] object-cover max-sm:w-full h-auto"
                  width={1920}
                  height={1080}
                  priority // Ensures the image is loaded as soon as possible
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
