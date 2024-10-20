import { useContext, useEffect, useState } from "react";
import Logo from "../images/logo.png";
// import {
//   BsFillHandThumbsUpFill,
//   BsHandThumbsUp,
//   BsFillHandThumbsDownFill,
//   BsHandThumbsDown,
// } from "react-icons/bs";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../toast/customToasts";
import { formatDate } from "../utils/formatDate";
import { useParams } from "react-router-dom";
import UserContext from "../context/UserContext/UserContext";
import { BASE_URL } from "../config";

const Review = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [product, setProduct] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  
  // Track like/dislike states for each comment by user
  // const [userLikes, setUserLikes] = useState(new Map());
  // const [userDislikes, setUserDislikes] = useState(new Map());
  
  const [visibleComments, setVisibleComments] = useState(2);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/product/singleproduct/${id}`
        );
       
        setProduct({ ...response.data.product });
        setComments(response.data.product.comments || []);
      } catch (err) {
        showErrorToast("An unexpected error occurred. Please try again.");
      }
    };
    fetchProduct();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      showErrorToast("It looks like you're not logged in. Please log in to share your thoughts!");
      return;
    }

    try {
      let token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/product/${id}/add-comment`,
        { id, text: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComments([...comments, response.data.comment]); // Add the new comment to the list
      setNewComment(""); // Clear the input

      showSuccessToast("Comment added successfully!");
    } catch (error) {
      showErrorToast(error.response.data.message);
    }
  };



  const handleShowMore = () => {
    setVisibleComments((prev) => prev + 2); // Increase visible comments by 2
  };

  const handleShowLess = () => {
    setVisibleComments((prev) => Math.max(prev - 2, 2));
  };

  return (
    <div className="mt-10">
      <h3 className="text-lg font-medium text-left">Share your feedback 🤔</h3>
      <form onSubmit={handleCommentSubmit} className="flex flex-col mt-4">
        <textarea
          className="p-2 border rounded mb-2 resize-none outline-none focus:border-emerald-600"
          placeholder="Write your feedback..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows="4"
          required
          name="text"
        />
        <div className="flex items-start mt-3">
          <button
            type="submit"
            className="w-fit bg-emerald-600 text-white rounded px-6 py-2 hover:bg-emerald-700"
          >
            Submit Feedback
          </button>
        </div>
      </form>
      <div className="my-4">
        <h3 className="font-medium mb-4 text-left">
          All reviews ({comments.length})
        </h3>
        <div className="flex gap-8 flex-col">
          {comments.length > 0 ? (
            comments.slice(0, visibleComments).map((comment, index) => (
              <div
                key={comment._id}
                className="review__container p-4 rounded-xl w-full lg:w-[430px]"
                style={{
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                }}
              >
                <div className="review__comment flex gap-4">
                  {/* <div className="review_avatar w-12 h-12 ">
                    <img
                      className="w-full h-full rounded-full"
                      src={Logo}
                      alt="avatar"
                    />
                  </div> */}
                  <div>
                    <div className="flex flex-col items-start">
                      <p className="text-md font-medium text-emerald-700">
                        {product.author}
                      </p>
                      <p className="text-xs">{formatDate(comment.createdAt)}</p>
                      <p className="mt-2 text-md font-medium tracking-wide">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-md text-gray-500 text-center mt-5">
              No comments yet.
            </div>
          )}
          {comments.length > 2 && (
            <div className="flex justify-center mt-4">
              {visibleComments < comments.length ? (
                <button
                  onClick={handleShowMore}
                  className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
                >
                  Show More
                </button>
              ) : (
                <button
                  onClick={handleShowLess}
                  className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
                >
                  Show Less
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;
