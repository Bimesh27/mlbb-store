'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";

const images = [
  "https://i.pinimg.com/564x/ac/9d/d0/ac9dd04283084af82c7d1ad8d83b8ef3.jpg",
  "https://i.pinimg.com/564x/e1/e3/9b/e1e39b3f194b30eff3256e062a0cf7ee.jpg",
  "https://i.pinimg.com/736x/e2/51/e9/e251e99dfdc526142f7f8cdf553ee532.jpg",
];

const Slider = () => {
  return (
    <div className="flex w-full gap-10 justify-center max-sm:flex-col bg-background">
      <div className="w-full max-w-5xl flex flex-col justify-between md:flex-row gap-8 md:gap-4 overflow-x-hidden">
        <Swiper
          spaceBetween={30}
          loop={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false, // Consider setting this to false for continuous autoplay
          }}
          className="mySwiper cursor-pointer w-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-fit flex justify-center">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-72 h-fit object-cover sm:w-96"
                  width={400} // Set a fixed width for the Image component
                  height={300} // Set a fixed height for the Image component
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
