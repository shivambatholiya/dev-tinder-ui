import React, { useEffect } from "react";
import UserCard from "../components/UserCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../features/feed/feedSlice";

const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector((store) => store.feed);
    const user = useSelector((store) => store.user);

    const getFeed = async () => {
        try {
            const feed = await axios.get(
                import.meta.env.VITE_API_BASE_URL + "/user/feed",
                { withCredentials: true },
            );

            if (feed.status === 200) {
                console.log("Feed data:", feed.data.data);

                dispatch(addFeed(feed?.data?.data));
            } else {
                console.error("Failed to fetch feed:", feed.statusText);
            }
        } catch (error) {
            console.log("Error fetching feed:", error);
        }
    };

    useEffect(() => {
        if (user) {
            getFeed();
        }
    }, [user]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 px-6 py-8">
            <UserCard feed={feed} />
        </div>
    );
};

export default Feed;
