import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IoClose } from "react-icons/io5";

interface ImageModalProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
}

const ImageModal = ({ images, currentIndex, onClose }: ImageModalProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center flex-col">
      <IoClose
        className="absolute top-10 right-10 text-white text-4xl cursor-pointer z-50 max-sm:top-4 max-sm:right-4"
        onClick={onClose}
      />

      <Swiper
        spaceBetween={30}
        className="mySwiper cursor-pointer w-full"
        initialSlide={currentIndex}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-fit flex justify-center">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-[90%] h-fit object-cover sm:w-96"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageModal;
