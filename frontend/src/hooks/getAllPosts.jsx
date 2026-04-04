
import axios from "axios";
import { serverUrl } from "../App";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPostData } from "../redux/postSlice";

const useAllPost = () => {
  const dispatch = useDispatch();
  const {userData} = useSelector((state) => state.user);
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
  }, [dispatch, userData]);
};
export default useAllPost;
