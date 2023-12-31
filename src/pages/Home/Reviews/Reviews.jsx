import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect } from "react";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
import Rating from "react-rating";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import { useAuth } from "../../../hooks/useAuth";
import { Slide } from "react-awesome-reveal";

const Reviews = () => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useAuth();

  useEffect(() => {
    const swiper = new Swiper(".swiper-container", {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      breakpoints: {
        640: {
          slidesPerView: 2, // Tablet devices
        },
        1024: {
          slidesPerView: 3, // Other devices
        },
      },
    });

    return () => {
      swiper.destroy();
    };
  }, []);

  const { data: reviews = [] } = useQuery(["reviews"], async () => {
    const res = await axiosSecure.get(`/reviews`);
    return res.data;
  });

  return (
    <div className={`bg-[#1f2340] ${theme}`}>
      <div className="py-4 md:px-4 lg:px-10 2xl:px-0 md:pt-4 md:pb-20">
        <div className="">
          <Slide>
            <SectionTitle
              title="Student Reviews"
              subTitle="They consistently leave positive reviews, highlighting the valuable knowledge gained, supportive instructors, and interactive learning experience. They describe their courses as life-changing, empowering, and exceeding expectations!"
            ></SectionTitle>
          </Slide>
        </div>
        <div>
          <div className="swiper-container myContainer overflow-hidden">
            <div className="swiper-wrapper text-white">
              {reviews?.map((review) => (
                <div
                  key={review._id}
                  className={`swiper-slide p-10 space-y-3 bg-[#392590da]  border border-blue-500 rounded-md ${theme}`}
                >
                  <p className="text-sm md:text-base">
                    {review.description.slice(0, 130)}.
                  </p>
                  <Rating
                    readonly
                    placeholderRating={review.rating}
                    emptySymbol={
                      <AiOutlineStar className="text-yellow-500 text-xl" />
                    }
                    placeholderSymbol={
                      <AiTwotoneStar className="text-yellow-500 text-xl" />
                    }
                    fullSymbol={
                      <AiTwotoneStar className="text-yellow-500 text-xl" />
                    }
                  />
                  <div className="flex gap-4 items-center">
                    <img
                      className={`w-20 h-20 rounded-full border-[#571ce057] shadow-white shadow md ${theme}`}
                      src={review.image}
                      alt="student image"
                    />
                    <div>
                      <p className="text-sm md:text-base">{review.name}</p>
                      <p className="text-sm md:text-base">Student</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
