import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
import CommentSectoin from "../components/CommentSectoin";
import PostCard from "../components/PostCard";
import "react-quill/dist/quill.snow.css"; // Import Quill styles for proper formatting

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        setPost(data.posts[0]);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRecentPosts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">
          Failed to load the post. Please try again later.
        </p>
      </div>
    );

  return (
    <div className="flex bg-white dark:bg-gray-900 dark:text-white">
      <main className="p-3 flex flex-col max-w-full mx-auto min-h-screen">
        {/* Post Title */}
        <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl lg:text-4xl dark:text-white self-center">
          {post && post.title}
        </h1>

        {/* Post Category */}
        <Link
          to={`/search?category=${post && post.category}`}
          className="self-center mt-5"
        >
          <Button color="gray" pill size="xs">
            {post && post.category}
          </Button>
        </Link>

        {/* Post Image */}
        <img
          src={post && post.image}
          alt={post && post.title}
          className="mt-10 p-3 max-h-[600px] w-full object-cover"
        />

        {/* Post Metadata */}
        <div className="flex justify-between p-3 border-b border-slate-300 mx-auto w-full max-w-2xl text-xs">
          <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
          <span className="italic">
            {post && (post.content.length / 1000).toFixed(0)} mins read
          </span>
        </div>

        {/* Post Content */}
        <div
          className="p-3 max-w-2xl mx-auto w-full post-content"
          dangerouslySetInnerHTML={{ __html: post && post.content }}
        ></div>

        {/* Comment Section */}
        <CommentSectoin postId={post && post._id} />

        {/* Recent Articles */}
        <div className="flex flex-col justify-center items-center mb-5">
          <h1 className="text-xl mt-5">Recent Articles</h1>
          <div className="flex flex-wrap gap-5 mt-5 justify-center">
            {recentPosts &&
              recentPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}
