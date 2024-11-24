import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import { CiSearch } from "react-icons/ci";

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });

  console.log(sidebarData);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchPosts = async () => {
      if (sidebarData.category === "uncategorized") {
        urlParams.delete("category");
      }

      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white dark:bg-gray-900 dark:text-white">
      <div className="flex flex-col w-full ">
        <div className="flex p-7 w-full justify-center border-gray-500">
          <form
            className="flex gap-4 md:gap-8 flex-col md:flex-row md:items-end"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-1 whitespace-nowrap font-semibold text-sm text-gray-500  dark:text-gray-200">
              <label className="font-semibold">Search Term:</label>
              <TextInput
                placeholder="Search..."
                id="searchTerm"
                type="text"
                rightIcon={CiSearch}
                value={sidebarData.searchTerm}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1 whitespace-nowrap font-semibold text-sm text-gray-500 dark:text-gray-200">
              <label className="font-semibold">Sort:</label>
              <Select
                onChange={handleChange}
                value={sidebarData.sort}
                id="sort"
              >
                <option value="desc">Latest</option>
                <option value="asc">Oldest</option>
              </Select>
            </div>
            <div className="flex flex-col gap-1 whitespace-nowrap font-semibold text-sm text-gray-500  dark:text-gray-200">
              <label className="font-semibold">Category:</label>
              <Select
                onChange={handleChange}
                value={sidebarData.category}
                id="category"
              >
                <option value="uncategorized">Select a category</option>
                <option value="Algorithms and Data Structures">
                  Algorithms and Data Structures
                </option>
                <option value="Career and Growth">Career and Growth</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Open Source">Open Source</option>
                <option value="Programming Languages">
                  Programming Languages
                </option>
                <option value="Software Design">Software Design</option>
                <option value="Software Development">
                  Software Development
                </option>
                <option value="Testing and Debugging">
                  Testing and Debugging
                </option>
                <option value="Tools and Technologies">
                  Tools and Technologies
                </option>
                <option value="Web and Mobile Projects">
                  Web & Mobile Projects
                </option>
              </Select>
            </div>
            <Button
              type="submit"
              className="bg-gray-900 text-white dark:bg-[#0e7490]  dark:text-white"
            >
              Apply Filters
            </Button>
          </form>
        </div>
        <div className="flex justify-center">
          <hr className="w-full md:w-[50%] border-gray-200 dark:border-gray-600" />
        </div>

        <div className="w-full flex flex-col items-center">
          <h1 className="text-3xl font-semiboldp-3 mt-5 ">Posts results:</h1>
          <div className="p-7 flex flex-wrap gap-4 items-center justify-center">
            {!loading && posts.length === 0 && (
              <p className="text-xl text-gray-500">No posts found.</p>
            )}
            {loading && <p className="text-xl text-gray-500">Loading...</p>}
            {!loading &&
              posts &&
              posts.map((post) => <PostCard key={post._id} post={post} />)}
            {showMore && (
              <button
                onClick={handleShowMore}
                className="text-teal-500 text-lg hover:underline p-7 w-full"
              >
                Show More
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
