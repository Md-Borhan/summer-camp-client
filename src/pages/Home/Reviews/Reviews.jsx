import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect } from "react";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
import Rating from "react-rating";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";

const Reviews = () => {
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const swiper = new Swiper(".swiper-container", {
      slidesPerView: 3, // Number of slides to show at a time
      spaceBetween: 20, // Space between slides (in pixels)
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
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
    <div>
      <div className="w-full pt-6 md:w-9/12 mx-auto ">
        <SectionTitle
          title="What The Say Student Reviews"
          subTitle="Attending the class at this academy was an excellent decision. The facilities are state-of-the-art and equipped with the latest equipment. The instructors are highly qualified and experienced, providing valuable insights and personalized guidance."
        ></SectionTitle>
      </div>
      <div>
        <div className="swiper-container myContainer overflow-hidden ">
          <div className="swiper-wrapper text-white">
            {reviews?.map((review) => (
              <div
                key={review._id}
                className="swiper-slide p-10 mb-10 md:mb-16 space-y-3 bg-[#39259077]  border border-blue-500 rounded-md"
              >
                <p>{review.description.slice(0, 130)}.</p>
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
                <div className="flex gap-8 items-center">
                  <img
                    className="w-20 h-20 rounded-full border-[#571ce057] shadow-white shadow md"
                    src={review.image}
                    alt="student image"
                  />
                  <div>
                    <p>{review.name}</p>
                    <p>Student</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;