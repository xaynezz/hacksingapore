import React from "react";

const Loading = () => {
    return (
        <div className="flex h-[calc(100svh-6.5rem)] items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-green-500"></div>
        </div>
    );
};

export default Loading;
