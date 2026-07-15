import React from 'react'

function Loading() {
    return (
        <div className="flex items-center justify-center text-lg font-semibold text-gray-700 sm:text-xl md:text-2xl">
            <span>Loading</span>

            <span className="ml-1 flex">
                <span
                    className="animate-bounce"
                    style={{ animationDelay: "0s" }}
                >
                    .
                </span>

                <span
                    className="animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                >
                    .
                </span>

                <span
                    className="animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                >
                    .
                </span>
            </span>
        </div>
    )
}

export default Loading