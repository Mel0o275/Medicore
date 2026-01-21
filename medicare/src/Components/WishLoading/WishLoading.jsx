import React from "react";
import useTheme from "../../Store/useTheme";

export default function WishlistLoading() {
  const theme = useTheme();
  const skeletonItems = [1, 2, 3]; // 3 items

  return (
    <div className="max-w-5xl mx-auto mt-4 md:mt-8 px-4 sm:px-6 lg:px-20">
      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {skeletonItems.map((id) => (
          <div
            style={{
              backgroundColor:
                theme.mode !== "dark"
                  ? theme.primaryColor
                  : theme.secondaryText,
            }}
            key={id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5  rounded-xl md:rounded-2xl shadow-md border border-gray-100 animate-pulse"
          >
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto mb-4 sm:mb-0">
              <div
                className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-lg md:rounded-xl  flex-shrink-0"
                style={{
                  backgroundColor:
                    theme.mode !== "dark"
                      ? theme.primaryColor
                      : theme.secondaryText,
                }}
              ></div>

              <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
                <div
                  className="h-4 sm:h-5 w-32 sm:w-40  rounded"
                  style={{
                    backgroundColor:
                      theme.mode !== "dark"
                        ? theme.primaryColor
                        : theme.secondaryText,
                  }}
                ></div>
                <div
                  className="h-3 sm:h-4 w-20 sm:w-24  rounded"
                  style={{
                    backgroundColor:
                      theme.mode !== "dark"
                        ? theme.primaryColor
                        : theme.secondaryText,
                  }}
                ></div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <div
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg md:rounded-xl  h-9 sm:h-10 w-full sm:w-24"
                style={{
                  backgroundColor:
                    theme.mode !== "dark"
                      ? theme.primaryColor
                      : theme.secondaryText,
                }}
              ></div>
              <div
                className="flex-shrink-0 p-2 rounded-lg md:rounded-xl  w-9 h-9 sm:w-10 sm:h-10"
                style={{
                  backgroundColor:
                    theme.mode !== "dark"
                      ? theme.primaryColor
                      : theme.secondaryText,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
