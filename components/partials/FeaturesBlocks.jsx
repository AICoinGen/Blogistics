import React from "react";
import {
  AdjustmentsIcon,
  AnnotationIcon,
  CheckCircleIcon,
  CheckIcon,
  ClipboardListIcon,
  SparklesIcon,
  TruckIcon,
} from "@heroicons/react/outline";
function FeaturesBlocks() {
  return (
    <section className="relative">
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div
        className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0 bg-gray-900 pointer-events-none"
        aria-hidden="true"
      ></div>
      <div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4">How Simple it works</h2>
            <p className="text-xl text-gray-600">
              We're dedicated to giving you the very best of your order, with
              focus from time of order and every other updates about the order
              as it moves along the processes of the supply chain all happening
              on the blockchain.
            </p>
          </div>

          {/* Items */}
          <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">
            {/* 1st item */}
            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
              <div className="bg-blue-600 w-max h-max p-5 m-2 text-white rounded-full">
                <ClipboardListIcon className="h-9" />
              </div>
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                Make an Order
              </h4>
              <p className="text-gray-600 text-center">
                places an order, processed by the DDap
              </p>
            </div>

            {/* 2nd item */}
            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
              <div className="bg-blue-600 w-max h-max p-5 m-2 text-white rounded-full">
                <CheckCircleIcon className="h-9" />
              </div>
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                Confirm Order
              </h4>
              <p className="text-gray-600 text-center">
                Confirmed by a manager is then pushed onto the production
              </p>
            </div>

            {/* 3rd item */}
            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
              <div className="bg-blue-600 w-max h-max p-5 m-2 text-white rounded-full">
                <SparklesIcon className="h-9" />
              </div>
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                Production
              </h4>
              <p className="text-gray-600 text-center">
                Ordering of raw materials, approval of the project timeline
              </p>
            </div>

            {/* 4th item */}
            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
              <div className="bg-blue-600 w-max h-max p-5 m-2 text-white rounded-full">
                <AdjustmentsIcon className="h-9" />
              </div>
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                Testing
              </h4>
              <p className="text-gray-600 text-center">
                The products are pushed on for quality testing
              </p>
            </div>

            {/* 5th item */}
            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
              <div className="bg-blue-600 w-max h-max p-5 m-2 text-white rounded-full">
                <TruckIcon className="h-9" />
              </div>
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                Transportation
              </h4>
              <p className="text-gray-600 text-center">
                Finished products has to be transported safely
              </p>
            </div>

            {/* 6th item */}
            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
              <div className="bg-blue-600 w-max h-max p-5 m-2 text-white rounded-full">
                <AnnotationIcon className="h-9" />
              </div>
              <h4
                className="text-xl font-bold text-center
              
              leading-snug tracking-tight mb-1"
              >
                Review and Suggestion
              </h4>
              <p className="text-gray-600 text-center">
                Feedback and suggestions for the product taken online
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesBlocks;
