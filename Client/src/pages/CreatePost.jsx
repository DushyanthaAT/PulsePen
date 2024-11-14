import { Button, FileInput, Select, TextInput } from "flowbite-react";
import { React, useState } from "react";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const CreatePost = () => {
  const [value, setValue] = useState("");
  const theme = useSelector((state) => state.theme.theme);
  return (
    <div className="w-screen bg-white  dark:bg-gray-900">
      <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold dark:text-white">
          Create a Post
        </h1>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput
              type="text"
              placeholder="Title"
              required
              id="title"
              className="flex-1"
            />
            <Select>
              <option value="Uncategorized">Select a Category</option>
              <option value="javascript">JavaScript</option>
              <option value="reactjs">React.js</option>
              <option value="nextjs">Next.js</option>
            </Select>
          </div>
          <div className="flex gap-4 items-center justify-between border-2 border-gray-400 border-dotted p-3">
            <FileInput type="file" accept="image/*" />
            <Button type="button" color="dark" size="sm">
              Upload Image
            </Button>
          </div>
          <div className={theme === "dark" ? "dark" : ""}>
            <ReactQuill
              theme="snow"
              placeholder="Write Something..."
              className="h-72 mb-12 dark:text-white"
              value={value}
              onChange={setValue}
              required
            />
          </div>

          <Button type="submit" className="bg-primary">
            Publish
          </Button>
        </form>
      </div>
    </div>
  );
};
