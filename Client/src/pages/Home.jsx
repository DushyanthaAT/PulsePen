import React from "react";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import bgHome from "../assets/bgHome.png";
import bgHomeDark from "../assets/bgHomeDark.png";
import logo from "../assets/DarkLogo.png";
import { CiSearch } from "react-icons/ci";
import { TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const theme = useSelector((state) => state.theme.theme);
  const bg = theme == "dark" ? bgHomeDark : bgHome;
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    // urlParams.set("searchTerm", sidebarData.searchTerm);
    // urlParams.set("sort", sidebarData.sort);
    // urlParams.set("category", sidebarData.category);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="flex flex-col w-full bg-white  dark:bg-gray-900 justify-center items-center dark:text-white">
      <div className="flex justify-center items-center w-full h-[40vh] md:h-[60vh]">
        <img src={bg} alt="Background" className="w-full h-full object-cover" />
        <div className="absolute flex flex-col justify-center items-center">
          <img
            src={logo}
            alt="Logo"
            className="w-[50vw] h-[auto] sm:w-[30vw] md:w-[20vw] mb-5"
          />
          <span className="text-center mx-5 text-sm md:text-lg mb-5">
            Discover fresh ideas, inspiring stories, and expert insights.
            <br /> Dive into latest articles and stay updated with the content
            that matters to you.
          </span>

          <div className="w-[90%] md:w-[60%]">
            <form onSubmit={handleSubmit}>
              <div className="relative">
                <TextInput
                  type="text"
                  placeholder="Start Exploring..."
                  rightIcon={CiSearch}
                  value={searchTerm}
                  className="inline"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-transparent h-10 w-10"
                ></button>
              </div>
            </form>
          </div>

          {/* <button className="bg-gray-800 rounded-xl mt-8 flex gap-3 items-center justify-center group">
            <div className="flex w-40 h-10 items-center justify-center text-md hover:text-lg transition-all duration-500 ease-out transform group-hover:scale-105 gap-1">
              <span className="font-semibold text-white">Start Exploring</span>
              <FaArrowRight className="mt-1 text-primary group-hover:hidden transition-all duration-500 ease-out" />
            </div>
          </button> */}
        </div>
      </div>
      <div className="max-w-full mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex flex-wrap gap-4 items-center justify-center">
              {posts.slice(0, 3).map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={"/search"}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
