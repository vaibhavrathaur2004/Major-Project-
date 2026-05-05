import React from "react";
import { MdRestaurant } from "react-icons/md";
import { FaGithub, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-white mt-5">
      <div className="mx-auto w-full max-w-6xl px-1 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
              <MdRestaurant className="text-[#FF5200]" />
              <span>Foodify</span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-6 text-gray-600">
              Fresh meals, fast delivery. Built for restaurants, customers, and delivery partners.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:justify-self-center">
            <div>
              <p className="text-sm font-semibold text-gray-900">Product</p>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li>
                  <a className="hover:text-gray-900" href="/">
                    Home
                  </a>
                </li>
                <li>
                  <a className="hover:text-gray-900" href="/my-orders">
                    My Orders
                  </a>
                </li>
                <li>
                  <a className="hover:text-gray-900" href="/cart">
                    Cart
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-900">Support</p>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li>
                  <a className="hover:text-gray-900" href="#">
                    Help Center
                  </a>
                </li>
                <li>
                  <a className="hover:text-gray-900" href="#">
                    Terms
                  </a>
                </li>
                <li>
                  <a className="hover:text-gray-900" href="#">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="md:justify-self-end">
            <p className="text-sm font-semibold text-gray-900">Follow</p>
            <div className="mt-3 flex items-center gap-3 text-gray-600">
              <a className="rounded-lg p-2 hover:bg-gray-100 hover:text-gray-900" href="#" aria-label="Twitter">
                <FaXTwitter className="text-lg" />
              </a>
              <a className="rounded-lg p-2 hover:bg-gray-100 hover:text-gray-900" href="#" aria-label="Instagram">
                <FaInstagram className="text-lg" />
              </a>
              <a className="rounded-lg p-2 hover:bg-gray-100 hover:text-gray-900" href="#" aria-label="LinkedIn">
                <FaLinkedin className="text-lg" />
              </a>
              <a className="rounded-lg p-2 hover:bg-gray-100 hover:text-gray-900" href="#" aria-label="GitHub">
                <FaGithub className="text-lg" />
              </a>
            </div>

            <div className="mt-5">
              <span className="inline-flex items-center rounded-full bg-[#FF5200]/10 px-3 py-1 text-xs font-semibold text-[#FF5200]">
                Fast • Fresh • Reliable
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t pt-6 text-xs text-gray-500 md:flex-row md:items-center">
          <p>© {year} Foodify. All rights reserved.</p>
          <p className="text-gray-500">Made with ❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

