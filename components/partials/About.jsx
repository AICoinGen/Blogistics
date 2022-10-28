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
function Terms() {
  return (
    <section className="relative">
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      {/* <div
        className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0 bg-white pointer-events-none"
        aria-hidden="true"
      ></div> */}
      {/* <div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"></div> */}

      <div className="relative max-w-6xl mx-auto pt-12 px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto space-y-4  pb-12 md:pb-20">
            <h2 className="h2 mb-4 text-2xl text-center">About schain</h2>

            <p>
              Welcome to Schain`, your number one platform to track your order
              along the supply chain process on the blockchain.
            </p>
            <p>
              We're dedicated to giving you the very best of your order, with
              focus from time of order and every other updates about the order
              as it moves along the processes of the supply chain all happening
              on the blockchain.
            </p>
            <p>
              Founded in 2022, by Sympodium, Schain` has come a long way from
              its beginnings in Ghana. When Albert, Sarkodie and Brilliant first
              started out with Schain, the passion for solving supply chain
              problems with blockchain drove them to undertake several
              researches so that Schain can offer the very best services it does
              now along the supply chain of many organizations here in Ghana and
              abroad and we are thrilled that we are able to turn our passion
              into such a revolutionary solution in supply chain.
            </p>

            <p>
              We hope you enjoy the services of the platform as much as we enjoy
              offering them to you. If you have any questions or comments,
              please don't hesitate to contact us.{" "}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Terms;
