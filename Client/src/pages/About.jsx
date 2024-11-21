import React from "react";

const About = () => {
  return (
    <div className="flex flex-col w-full bg-white  dark:bg-gray-900 justify-center items-center dark:text-white">
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-2xl mx-auto p-3 text-center">
          <div>
            <h1 className="text-3xl font font-semibold text-center my-7">
              PulsePen
            </h1>
            <div className="text-md flex flex-col gap-6">
              <p>
                Welcome to PulsePen—a platform where stories, ideas, and
                creativity flow freely! ✍️ At PulsePen, we believe that every
                voice matters. That’s why we’ve created a space where anyone can
                become a writer and share their thoughts, passions, and
                perspectives with a global audience.
              </p>
              <h2 className="text-xl font-bold">Our Mission</h2>

              <p>
                To empower individuals to express themselves, connect with
                others, and spark meaningful conversations through the written
                word. Whether you're sharing a life experience, exploring a
                creative idea, or diving into a trending topic, PulsePen is the
                place to let your voice be heard.
              </p>

              <h2 className="text-xl font-bold">What Makes Us Different</h2>
              <ul className="list-disc list-inside text-left">
                <li>
                  <strong>Open Platform for Writers:</strong> Got something to
                  say? At PulsePen, anyone can join, write, and publish their
                  thoughts. We celebrate creativity and welcome diverse voices
                  from all walks of life.
                </li>
                <li>
                  <strong>Engaging Content for Readers:</strong> Discover fresh
                  perspectives and stories that inform, entertain, and inspire.
                </li>
                <li>
                  <strong>A Thriving Community:</strong> PulsePen is more than
                  just a blog—it’s a hub for connection, collaboration, and
                  shared growth.
                </li>
              </ul>
              <h2 className="text-xl font-bold">Join the PulsePen Movement</h2>
              <p>
                Becoming a contributor is simple! Create an account, write your
                piece, and share it with the world. Whether you’re a seasoned
                writer or just starting, your story has a place here. Together,
                let’s make PulsePen a community where ideas flourish, creativity
                thrives, and connections are forged. Thank you for being part of
                the PulsePen family—where every word leaves a mark.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
