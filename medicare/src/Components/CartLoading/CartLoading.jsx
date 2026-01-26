import React from "react";
import useTheme from "../../Store/useTheme";

export default function CartLoading() {
  // We'll show 3 skeleton items as placeholders
  const skeletonItems = [1, 2, 3];

  const theme = useTheme()

  return (
    <div className="max-w-6xl mx-auto mt-8 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items Skeleton */}
        <div className="lg:col-span-2 space-y-5">
          {skeletonItems.map((item) => (
            <div
              style={{
                backgroundColor:
                 theme.primaryColor
              }}
              key={item}
              className="p-5  rounded-2xl shadow-sm  flex items-center gap-6 animate-pulse"
            >
              <div className="w-24 h-24 bg-gray-200 rounded-xl border"></div>
              <div className="flex-1 space-y-4">
                <div
                  className="h-6  bg-gray-200  rounded w-3/4"
                  // style={{
                  //   backgroundColor:
                  //     theme.mode !== "dark"
                  //       ? theme.primaryColor
                  //       : theme.secondaryText,
                  // }}
                ></div>
                <div
                  className="h-4  bg-gray-200 rounded w-1/4"
                  // style={{
                  //   backgroundColor:
                  //     theme.mode !== "dark"
                  //       ? theme.primaryColor
                  //       : theme.secondaryText,
                  // }}
                ></div>
                <div className="flex items-center gap-4">
                  <div
                    className="h-8 w-8  bg-gray-200 rounded-full"
                    // style={{
                    //   backgroundColor:
                    //     theme.mode !== "dark"
                    //       ? theme.primaryColor
                    //       : theme.secondaryText,
                    // }}
                  ></div>
                  <div
                    className="h-6 w-6  bg-gray-200  rounded"
                    // style={{
                    //   backgroundColor:
                    //     theme.mode !== "dark"
                    //       ? theme.primaryColor
                    //       : theme.secondaryText,
                    // }}
                  ></div>
                  <div
                    className="h-8 w-8  bg-gray-200 rounded-full"
                    // style={{
                    //   backgroundColor:
                    //     theme.mode !== "dark"
                    //       ? theme.primaryColor
                    //       : theme.secondaryText,
                    // }}
                  ></div>
                </div>
              </div>
              <div className="text-right min-w-[100px] space-y-2">
                <div
                  className="h-6  rounded  bg-gray-200 w-16 mx-auto"
                  // style={{
                  //   backgroundColor:
                  //     theme.mode !== "dark"
                  //       ? theme.primaryColor
                  //       : theme.secondaryText,
                  // }}
                ></div>
                <div
                  className="h-4  bg-gray-200  rounded w-12 mx-auto"
             
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Skeleton */}
        <div
       
          className="p-6  rounded-2xl shadow-md border border-gray-100 h-fit animate-pulse"
          style={{
                backgroundColor:
                 theme.primaryColor
              }}
        >
          <div
          
            className="h-8 bg-gray-200  rounded w-3/4 mb-5"
          ></div>
          <div className="flex justify-between py-2">
            <div
              className="h-4 bg-gray-200  rounded w-1/3"
          
            ></div>
            <div
              className="h-4 bg-gray-200  rounded w-1/4"
          
            ></div>
          </div>
          <div className="mt-5 flex items-center gap-2">
            <div
              className="flex-1 h-10 bg-gray-200  rounded-full"
             
            ></div>
            <div
              className="h-10 w-24 bg-gray-200 rounded-full"
        
            ></div>
          </div>
          <hr
            className="my-5 bg-gray-200"
         
          />
          <div className="flex justify-between text-lg font-bold text-gray-800">
            <div
              className="h-6 bg-gray-200  rounded w-1/2"
       
            ></div>
            <div
              className="h-6 bg-gray-200 rounded w-16"
          
            ></div>
          </div>
          <div className="flex flex-col items-center w-full mt-6 gap-3">
            <div
              className="h-12 w-full bg-gray-200 rounded-xl"
       
            ></div>
            <div
              className="h-12 w-full  bg-gray-200 rounded-xl"
          
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
