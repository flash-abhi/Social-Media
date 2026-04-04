
import axios from "axios";
import { serverUrl } from "../App";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPostData } from "../redux/postSlice";

const useAllPost = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/post/getAll",{withCredentials:true});
        dispatch(setPostData( result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [dispatch]);
};
export default useAllPost;
