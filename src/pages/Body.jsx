import React, { useState } from "react";
import { App, Button, Layout, Menu } from "antd";
import avatar from "../assets/images//user.png";
import Dashboard from "../components/Dashboard";
import Listing from "../components/Listing";
import User from "../components/User";
import Transactions from "../components/Transactions";
import PersonalInformation from "../components/PersonalInformation";
import Faq from "../components/Faq";
import TermsAndConditions from "../components/TermsAndConditions";
import ManageQuests from "../components/ManageQuests";
import ManageCategory from "../components/ManageCategory";
import Communications from "../components/Communications";
// import { Basic } from "../api/basic";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
//
const { Header, Content, Sider } = Layout;
const Body = () => {
  const [selectedTitle, setSelectedTitle] = useState("Dashboard");
  const [cookie, , removeCookie] = useCookies(["token"]);
  const navig = useNavigate();
  const { message } = App.useApp();
  useEffect(() => {
    if (!cookie.token) {
      navig("/login");
    }
  }, []);

  const items = [
    {
      label: (
        <span
          className={`${
            selectedTitle?.props?.children === "Dashboard"
              ? "text-primary"
              : "text-title"
          } text-sm font-work font-semibold`}
        >
          Dashboard
        </span>
      ),
      key: "1",
      icon:
        selectedTitle?.props?.children === "Dashboard" ? (
          <svg
            width="15"
            height="16"
            viewBox="0 0 15 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 0.515625C3.09098 0.772918 0 4.0251 0 7.99922C0 12.1414 3.35786 15.4992 7.5 15.4992C9.39113 15.4992 11.1188 14.7993 12.438 13.6443L7.15045 8.35675C7.05532 8.26374 7 8.13529 7 7.99922V0.515625Z"
              fill="#7F6DD5"
            />
            <path
              d="M13.1451 12.9372C14.3001 11.618 15 9.89034 15 7.99922C15 6.97101 14.7931 5.99112 14.4186 5.09892L8.3441 8.13619L13.1451 12.9372Z"
              fill="#7F6DD5"
            />
            <path
              d="M13.9708 4.20483C12.7472 2.12267 10.5473 0.683286 8 0.515625V7.19021L13.9708 4.20483Z"
              fill="#7F6DD5"
            />
          </svg>
        ) : (
          <svg
            width="15"
            height="16"
            viewBox="0 0 15 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.5 7.99922C0.5 4.47279 3.10791 1.5551 6.5 1.07006V7.99922C6.5 8.2703 6.60977 8.52615 6.79852 8.71193L11.6922 13.6056C10.5235 14.4811 9.07276 14.9992 7.5 14.9992C3.63401 14.9992 0.5 11.8652 0.5 7.99922ZM14.5 7.99922C14.5 9.57197 13.9818 11.0227 13.1064 12.1914L9.18819 8.27316L14.1458 5.79434C14.3755 6.48708 14.5 7.2282 14.5 7.99922ZM8.5 6.38119V1.07006C10.4637 1.35086 12.1654 2.44702 13.2502 4.0061L8.5 6.38119Z"
              fill="#F4F2FD"
              stroke="#7F6DD5"
            />
          </svg>
        ),
    },
    {
      label: (
        <span
          className={`${
            selectedTitle?.props?.children === "Listing"
              ? "text-primary"
              : "text-title"
          } text-sm font-work font-semibold`}
        >
          Listing
        </span>
      ),
      key: "2",
      icon:
        selectedTitle?.props?.children === "Listing" ? (
          <svg
            width="15"
            height="16"
            viewBox="0 0 15 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 5C10 4.72386 10.2239 4.5 10.5 4.5C10.7761 4.5 11 4.72386 11 5C11 5.27614 10.7761 5.5 10.5 5.5C10.2239 5.5 10 5.27614 10 5Z"
              fill="#7F6DD5"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.14645 0.646447C7.24021 0.552678 7.36739 0.5 7.5 0.5H13.5C14.3284 0.5 15 1.17157 15 2V8C15 8.13261 14.9473 8.25979 14.8536 8.35355L7.85355 15.3536C7.65829 15.5488 7.34171 15.5488 7.14645 15.3536L0.146447 8.35355C-0.0488155 8.15829 -0.0488155 7.84171 0.146447 7.64645L7.14645 0.646447ZM10.5 3.5C9.67157 3.5 9 4.17157 9 5C9 5.82843 9.67157 6.5 10.5 6.5C11.3284 6.5 12 5.82843 12 5C12 4.17157 11.3284 3.5 10.5 3.5Z"
              fill="#7F6DD5"
            />
          </svg>
        ) : (
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.5 0.5C8.23478 0.5 7.98043 0.605357 7.79289 0.792893L0.792893 7.79289C0.402369 8.18342 0.402369 8.81658 0.792893 9.20711L7.79289 16.2071C8.18342 16.5976 8.81658 16.5976 9.20711 16.2071L16.2071 9.20711C16.3946 9.01957 16.5 8.76522 16.5 8.5V2.5C16.5 1.39543 15.6046 0.5 14.5 0.5H8.5Z"
              fill="#F4F2FD"
              stroke="#7F6DD5"
              stroke-linejoin="round"
            />
            <circle cx="11.5" cy="5.5" r="1" stroke="#7F6DD5" />
          </svg>
        ),
    },
    {
      label: (
        <span
          className={`${
            selectedTitle?.props?.children === "Users"
              ? "text-primary"
              : "text-title"
          } text-sm font-work font-semibold`}
        >
          Users
        </span>
      ),
      key: "3",
      icon:
        selectedTitle?.props?.children === "Users" ? (
          <svg
            width="15"
            height="16"
            viewBox="0 0 15 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 6C5 4.61929 6.11929 3.5 7.5 3.5C8.88071 3.5 10 4.61929 10 6C10 7.38071 8.88071 8.5 7.5 8.5C6.11929 8.5 5 7.38071 5 6Z"
              fill="#8C78EA"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.5 0.5C3.35786 0.5 0 3.85786 0 8C0 12.1421 3.35786 15.5 7.5 15.5C11.6421 15.5 15 12.1421 15 8C15 3.85786 11.6421 0.5 7.5 0.5ZM1 8C1 4.41015 3.91015 1.5 7.5 1.5C11.0899 1.5 14 4.41015 14 8C14 9.84956 13.2275 11.5187 11.9875 12.7024C11.8365 10.9086 10.3328 9.5 8.5 9.5H6.5C4.66724 9.5 3.16345 10.9086 3.01247 12.7024C1.77251 11.5187 1 9.84956 1 8Z"
              fill="#8C78EA"
            />
          </svg>
        ) : (
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="#F4F2FD"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.5 13V12.4999C3.5 10.843 4.84315 9.5 6.5 9.5H8.5C10.1569 9.5 11.5 10.843 11.5 12.4999V13M7.5 3.5C6.39543 3.5 5.5 4.39543 5.5 5.5C5.5 6.60457 6.39543 7.5 7.5 7.5C8.60457 7.5 9.5 6.60457 9.5 5.5C9.5 4.39543 8.60457 3.5 7.5 3.5ZM7.5 14.5C3.63401 14.5 0.5 11.366 0.5 7.5C0.5 3.63401 3.63401 0.5 7.5 0.5C11.366 0.5 14.5 3.63401 14.5 7.5C14.5 11.366 11.366 14.5 7.5 14.5Z"
              stroke="#8C78EA"
              stroke-linecap="square"
            />
          </svg>
        ),
    },
    {
      label: (
        <span
          className={`${
            selectedTitle?.props?.children === "Categories"
              ? "text-primary"
              : "text-title"
          } text-sm font-work font-semibold`}
        >
          Categories
        </span>
      ),
      key: "4",
      icon:
        selectedTitle?.props?.children === "Categories" ? (
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 1C0.671573 1 0 1.67157 0 2.5V4.5C0 5.32843 0.671573 6 1.5 6H3.5C4.32843 6 5 5.32843 5 4.5V2.5C5 1.67157 4.32843 1 3.5 1H1.5Z"
              fill="#8C78EA"
            />
            <path d="M7 4H15V3H7V4Z" fill="#8C78EA" />
            <path
              d="M1.5 9C0.671573 9 0 9.67157 0 10.5V12.5C0 13.3284 0.671573 14 1.5 14H3.5C4.32843 14 5 13.3284 5 12.5V10.5C5 9.67157 4.32843 9 3.5 9H1.5Z"
              fill="#8C78EA"
            />
            <path d="M7 12H15V11H7V12Z" fill="#8C78EA" />
          </svg>
        ) : (
          <svg
            width="14"
            height="13"
            viewBox="0 0 14 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect y="8" width="5" height="5" rx="1.1" fill="#E6ECFF" />
            <rect width="5" height="5" rx="1.1" fill="#E6ECFF" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5 1.1C5 0.492487 4.50751 0 3.9 0H1.1C0.492487 0 0 0.492487 0 1.1V3.9C0 4.50751 0.492487 5 1.1 5H3.9C4.50751 5 5 4.50751 5 3.9V1.1ZM4 2.1C4 1.49249 3.50751 1 2.9 1H2.1C1.49249 1 1 1.49249 1 2.1V2.9C1 3.50751 1.49249 4 2.1 4H2.9C3.50751 4 4 3.50751 4 2.9V2.1Z"
              fill="#8C78EA"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5 9.1C5 8.49249 4.50751 8 3.9 8H1.1C0.492487 8 0 8.49249 0 9.1V11.9C0 12.5075 0.492487 13 1.1 13H3.9C4.50751 13 5 12.5075 5 11.9V9.1ZM4 10.1C4 9.49249 3.50751 9 2.9 9H2.1C1.49249 9 1 9.49249 1 10.1V10.9C1 11.5075 1.49249 12 2.1 12H2.9C3.50751 12 4 11.5075 4 10.9V10.1Z"
              fill="#8C78EA"
            />
            <rect x="6" y="2" width="8" height="1" fill="#8C78EA" />
            <rect x="6" y="10" width="8" height="1" fill="#8C78EA" />
          </svg>
        ),
    },
    {
      label: (
        <span
          className={`${
            selectedTitle?.props?.children === "Gamification"
              ? "text-primary"
              : "text-title"
          } text-sm font-work font-semibold`}
        >
          Gamification
        </span>
      ),
      key: "5",
      icon:
        selectedTitle?.props?.children === "Gamification" ? (
          <svg
            width="15"
            height="16"
            viewBox="0 0 15 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.5 0.5C3.67157 0.5 3 1.17157 3 2V2.5H2.5C1.11929 2.5 0 3.61929 0 5C0 6.38071 1.11929 7.5 2.5 7.5H3.25606C3.82053 9.09703 5.26092 10.2803 7 10.4725V14.5H4V15.5H11V14.5H8V10.4725C9.73908 10.2803 11.1795 9.09703 11.7439 7.5H12.5C13.8807 7.5 15 6.38071 15 5C15 3.61929 13.8807 2.5 12.5 2.5H12V2C12 1.17157 11.3284 0.5 10.5 0.5H4.5ZM12 3.5V6C12 6.169 11.9907 6.33583 11.9725 6.5H12.5C13.3284 6.5 14 5.82843 14 5C14 4.17157 13.3284 3.5 12.5 3.5H12ZM2.5 3.5H3V6C3 6.169 3.00932 6.33583 3.02746 6.5H2.5C1.67157 6.5 1 5.82843 1 5C1 4.17157 1.67157 3.5 2.5 3.5Z"
              fill="#8C78EA"
            />
          </svg>
        ) : (
          <svg
            width="15"
            height="16"
            viewBox="0 0 15 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.5 0.5C3.67157 0.5 3 1.17157 3 2V2.5H2.5C1.11929 2.5 0 3.61929 0 5C0 6.38071 1.11929 7.5 2.5 7.5H3.25606C3.82053 9.09703 5.26092 10.2803 7 10.4725V14.5H4V15.5H11V14.5H8V10.4725C9.73908 10.2803 11.1795 9.09703 11.7439 7.5H12.5C13.8807 7.5 15 6.38071 15 5C15 3.61929 13.8807 2.5 12.5 2.5H12V2C12 1.17157 11.3284 0.5 10.5 0.5H4.5ZM12 3.5V6C12 6.169 11.9907 6.33583 11.9725 6.5H12.5C13.3284 6.5 14 5.82843 14 5C14 4.17157 13.3284 3.5 12.5 3.5H12ZM2.5 3.5H3V6C3 6.169 3.00932 6.33583 3.02746 6.5H2.5C1.67157 6.5 1 5.82843 1 5C1 4.17157 1.67157 3.5 2.5 3.5Z"
              fill="#ffffff"
              stroke="#8C78EA"
            />
          </svg>
        ),
    },
    {
      label: (
        <span
          className={`${
            selectedTitle?.props?.children === "Transactions"
              ? "text-primary"
              : "text-title"
          } text-sm font-work font-semibold`}
        >
          Transactions
        </span>
      ),
      key: "6",
      icon:
        selectedTitle?.props?.children === "Transactions" ? (
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5 2C14.3284 2 15 2.67157 15 3.5V5H0V3.5C0 2.67157 0.671573 2 1.5 2H13.5Z"
              fill="#8C78EA"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 6V11.5C0 12.3284 0.671573 13 1.5 13L13.5 13C14.3284 13 15 12.3284 15 11.5V6H0ZM2 10H8V9H2V10ZM13 10H10V9H13V10Z"
              fill="#8C78EA"
            />
          </svg>
        ) : (
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.5 5.5H14.5M2 9.5H8M10 9.5H13M0.5 3.5L0.5 11.5C0.5 12.0523 0.947716 12.5 1.5 12.5L13.5 12.5C14.0523 12.5 14.5 12.0523 14.5 11.5V3.5C14.5 2.94772 14.0523 2.5 13.5 2.5L1.5 2.5C0.947716 2.5 0.5 2.94772 0.5 3.5Z"
              stroke="#8C78EA"
            />
          </svg>
        ),
    },
    {
      label: (
        <span
          className={`${
            selectedTitle?.props?.children === "Communications"
              ? "text-primary"
              : "text-title"
          } text-sm font-work font-semibold`}
        >
          Communications
        </span>
      ),
      key: "7",
      icon:
        selectedTitle?.props?.children === "Communications" ? (
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5 2C14.3284 2 15 2.67157 15 3.5V5H0V3.5C0 2.67157 0.671573 2 1.5 2H13.5Z"
              fill="#8C78EA"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 6V11.5C0 12.3284 0.671573 13 1.5 13L13.5 13C14.3284 13 15 12.3284 15 11.5V6H0ZM2 10H8V9H2V10ZM13 10H10V9H13V10Z"
              fill="#8C78EA"
            />
          </svg>
        ) : (
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.5 5.5H14.5M2 9.5H8M10 9.5H13M0.5 3.5L0.5 11.5C0.5 12.0523 0.947716 12.5 1.5 12.5L13.5 12.5C14.0523 12.5 14.5 12.0523 14.5 11.5V3.5C14.5 2.94772 14.0523 2.5 13.5 2.5L1.5 2.5C0.947716 2.5 0.5 2.94772 0.5 3.5Z"
              stroke="#8C78EA"
            />
          </svg>
        ),
    },
    {
      label: (
        <span
          className={`${
            selectedTitle?.props?.children === "Settings"
              ? "text-primary"
              : "text-title"
          } text-sm font-work font-semibold`}
        >
          Settings
        </span>
      ),
      key: "8",
      children: [
        {
          key: "9",
          label: (
            <span
              className={`${
                selectedTitle?.props?.children === "Personal Information"
                  ? "text-primary"
                  : "text-title"
              } text-sm font-work font-semibold`}
            >
              Personal Information
            </span>
          ),
          icon:
            selectedTitle?.props?.children === "Personal Information" ? (
              <svg
                width="11"
                height="16"
                viewBox="0 0 11 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5 3.99804C2.5 2.34214 3.84299 1 5.5 1C7.15701 1 8.5 2.34214 8.5 3.99804C8.5 5.65395 7.15701 6.99609 5.5 6.99609C3.84299 6.99609 2.5 5.65395 2.5 3.99804ZM0.5 12.9936C0.5 11.3368 1.84314 9.99414 3.5 9.99414H7.5C9.15686 9.99414 10.5 11.3368 10.5 12.9936V14.9909H0.5V12.9936Z"
                  fill="#8C78EA"
                  stroke="#8C78EA"
                  stroke-linecap="square"
                />
              </svg>
            ) : (
              <svg
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5 3.99804C4.5 2.34214 5.84299 1 7.5 1C9.15701 1 10.5 2.34214 10.5 3.99804C10.5 5.65395 9.15701 6.99609 7.5 6.99609C5.84299 6.99609 4.5 5.65395 4.5 3.99804ZM2.5 12.9936C2.5 11.3368 3.84314 9.99414 5.5 9.99414H9.5C11.1569 9.99414 12.5 11.3368 12.5 12.9936V14.9909H2.5V12.9936Z"
                  fill="#F4F2FD"
                  stroke="#8C78EA"
                  strokeLinecap="square"
                />
              </svg>
            ),
        },
        {
          key: "10",
          label: (
            <span
              className={`${
                selectedTitle?.props?.children === "FAQ"
                  ? "text-primary"
                  : "text-title"
              } text-sm font-work font-semibold`}
            >
              FAQ
            </span>
          ),
          icon:
            selectedTitle?.props?.children === "FAQ" ? (
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1 1.5C1 0.671573 1.67157 0 2.5 0H10.7071L14 3.29289V13.5C14 14.3284 13.3284 15 12.5 15H2.5C1.67157 15 1 14.3284 1 13.5V1.5ZM7 10V8H5V7H7V5H8V7H10V8H8V10H7Z"
                  fill="#8c78ea"
                />
              </svg>
            ) : (
              <svg
                width="15"
                height="17"
                viewBox="0 0 15 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.0607 0.646447L10.9142 0.5H10.7071H2.5C1.39543 0.5 0.5 1.39543 0.5 2.5V14.5C0.5 15.6046 1.39543 16.5 2.5 16.5H12.5C13.6046 16.5 14.5 15.6046 14.5 14.5V4.29289V4.08579L14.3536 3.93934L11.0607 0.646447Z"
                  fill="#F4F2FD"
                  stroke="#8C78EA"
                />
                <rect
                  width="1"
                  height="5"
                  transform="translate(10 8) rotate(90)"
                  fill="#003CFF"
                />
                <rect
                  width="1"
                  height="5"
                  transform="translate(7 6)"
                  fill="#003CFF"
                />
              </svg>
            ),
        },
        {
          key: "11",
          label: (
            <span
              className={`${
                selectedTitle?.props?.children === "Term & Conditions"
                  ? "text-primary"
                  : "text-title"
              } text-sm font-work font-semibold`}
            >
              Term & Conditions
            </span>
          ),
          icon:
            selectedTitle?.props?.children === "Term & Conditions" ? (
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.69696 1.04043C7.57119 0.986524 7.42881 0.986524 7.30304 1.04043L0.30304 4.04043C0.119198 4.11922 0 4.29999 0 4.5C0 4.70001 0.119198 4.88078 0.30304 4.95957L7.30304 7.95957C7.42881 8.01348 7.57119 8.01348 7.69696 7.95957L14.697 4.95957C14.8808 4.88078 15 4.70001 15 4.5C15 4.29999 14.8808 4.11922 14.697 4.04043L7.69696 1.04043Z"
                  fill="#8C78EA"
                />
                <path
                  d="M7.5 9.95602L0.69696 7.04043L0.30304 7.95957L7.5 11.044L14.697 7.95957L14.303 7.04043L7.5 9.95602Z"
                  fill="#8C78EA"
                />
                <path
                  d="M0.69696 10.0404L0.30304 10.9596L7.5 14.044L14.697 10.9596L14.303 10.0404L7.5 12.956L0.69696 10.0404Z"
                  fill="#8C78EA"
                />
              </svg>
            ) : (
              <svg
                width="15"
                height="14"
                viewBox="0 0 15 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask id="path-1-inside-1_382_303666" fill="white">
                  <path d="M7.69696 0.0404275C7.57119 -0.0134758 7.42881 -0.0134758 7.30304 0.0404275L0.30304 3.04043C0.119198 3.11922 0 3.29999 0 3.5C0 3.70001 0.119198 3.88078 0.30304 3.95957L7.30304 6.95957C7.42881 7.01348 7.57119 7.01348 7.69696 6.95957L14.697 3.95957C14.8808 3.88078 15 3.70001 15 3.5C15 3.29999 14.8808 3.11922 14.697 3.04043L7.69696 0.0404275Z" />
                  <path d="M7.5 8.95602L0.69696 6.04043L0.30304 6.95957L7.5 10.044L14.697 6.95957L14.303 6.04043L7.5 8.95602Z" />
                  <path d="M0.69696 9.04043L0.30304 9.95957L7.5 13.044L14.697 9.95957L14.303 9.04043L7.5 11.956L0.69696 9.04043Z" />
                </mask>
                <path
                  d="M7.69696 0.0404275C7.57119 -0.0134758 7.42881 -0.0134758 7.30304 0.0404275L0.30304 3.04043C0.119198 3.11922 0 3.29999 0 3.5C0 3.70001 0.119198 3.88078 0.30304 3.95957L7.30304 6.95957C7.42881 7.01348 7.57119 7.01348 7.69696 6.95957L14.697 3.95957C14.8808 3.88078 15 3.70001 15 3.5C15 3.29999 14.8808 3.11922 14.697 3.04043L7.69696 0.0404275Z"
                  fill="#E6ECFF"
                />
                <path
                  d="M7.5 8.95602L0.69696 6.04043L0.30304 6.95957L7.5 10.044L14.697 6.95957L14.303 6.04043L7.5 8.95602Z"
                  fill="#E6ECFF"
                />
                <path
                  d="M0.69696 9.04043L0.30304 9.95957L7.5 13.044L14.697 9.95957L14.303 9.04043L7.5 11.956L0.69696 9.04043Z"
                  fill="#E6ECFF"
                />
                <path
                  d="M7.30304 0.0404275L7.69696 0.959573L7.69696 0.959573L7.30304 0.0404275ZM7.69696 0.0404275L7.30304 0.959573L7.30304 0.959573L7.69696 0.0404275ZM0.30304 3.04043L-0.0908789 2.12128L-0.0908793 2.12128L0.30304 3.04043ZM0.30304 3.95957L-0.0908793 4.87872L-0.0908789 4.87872L0.30304 3.95957ZM7.30304 6.95957L7.69696 6.04043L7.69696 6.04043L7.30304 6.95957ZM7.69696 6.95957L7.30304 6.04043L7.30304 6.04043L7.69696 6.95957ZM14.697 3.95957L15.0909 4.87872L15.0909 4.87872L14.697 3.95957ZM14.697 3.04043L15.0909 2.12128L15.0909 2.12128L14.697 3.04043ZM0.69696 6.04043L1.09088 5.12128L0.171734 4.72736L-0.222185 5.64651L0.69696 6.04043ZM7.5 8.95602L7.10608 9.87516L7.5 10.044L7.89392 9.87516L7.5 8.95602ZM0.30304 6.95957L-0.616105 6.56565L-1.01002 7.4848L-0.0908789 7.87872L0.30304 6.95957ZM7.5 10.044L7.10608 10.9631L7.5 11.132L7.89392 10.9631L7.5 10.044ZM14.697 6.95957L15.0909 7.87872L16.01 7.4848L15.6161 6.56565L14.697 6.95957ZM14.303 6.04043L15.2222 5.64651L14.8283 4.72736L13.9091 5.12128L14.303 6.04043ZM0.30304 9.95957L-0.616105 9.56565L-1.01002 10.4848L-0.0908789 10.8787L0.30304 9.95957ZM0.69696 9.04043L1.09088 8.12128L0.171734 7.72736L-0.222186 8.64651L0.69696 9.04043ZM7.5 13.044L7.10608 13.9631L7.5 14.132L7.89392 13.9631L7.5 13.044ZM14.697 9.95957L15.0909 10.8787L16.01 10.4848L15.6161 9.56565L14.697 9.95957ZM14.303 9.04043L15.2222 8.64651L14.8283 7.72736L13.9091 8.12128L14.303 9.04043ZM7.5 11.956L7.10608 12.8752L7.5 13.044L7.89392 12.8752L7.5 11.956ZM7.69696 0.959573C7.57119 1.01348 7.42881 1.01348 7.30304 0.959573L8.09088 -0.878718C7.71356 -1.04043 7.28644 -1.04043 6.90912 -0.878718L7.69696 0.959573ZM0.69696 3.95957L7.69696 0.959573L6.90912 -0.878718L-0.0908789 2.12128L0.69696 3.95957ZM1 3.5C1 3.70001 0.880801 3.88078 0.69696 3.95957L-0.0908793 2.12128C-0.642404 2.35765 -1 2.89996 -1 3.5H1ZM0.69696 3.04043C0.880801 3.11922 1 3.29999 1 3.5H-1C-1 4.10004 -0.642404 4.64235 -0.0908793 4.87872L0.69696 3.04043ZM7.69696 6.04043L0.69696 3.04043L-0.0908789 4.87872L6.90912 7.87872L7.69696 6.04043ZM7.30304 6.04043C7.42881 5.98652 7.57119 5.98652 7.69696 6.04043L6.90912 7.87872C7.28644 8.04043 7.71356 8.04043 8.09088 7.87872L7.30304 6.04043ZM14.303 3.04043L7.30304 6.04043L8.09088 7.87872L15.0909 4.87872L14.303 3.04043ZM14 3.5C14 3.29998 14.1192 3.11922 14.303 3.04043L15.0909 4.87872C15.6424 4.64235 16 4.10004 16 3.5H14ZM14.303 3.95957C14.1192 3.88078 14 3.70002 14 3.5H16C16 2.89996 15.6424 2.35765 15.0909 2.12128L14.303 3.95957ZM7.30304 0.959573L14.303 3.95957L15.0909 2.12128L8.09088 -0.878718L7.30304 0.959573ZM0.30304 6.95957L7.10608 9.87516L7.89392 8.03687L1.09088 5.12128L0.30304 6.95957ZM1.22219 7.35349L1.6161 6.43435L-0.222185 5.64651L-0.616105 6.56565L1.22219 7.35349ZM7.89392 9.12484L0.69696 6.04043L-0.0908789 7.87872L7.10608 10.9631L7.89392 9.12484ZM14.303 6.04043L7.10608 9.12484L7.89392 10.9631L15.0909 7.87872L14.303 6.04043ZM13.3839 6.43435L13.7778 7.35349L15.6161 6.56565L15.2222 5.64651L13.3839 6.43435ZM7.89392 9.87516L14.697 6.95957L13.9091 5.12128L7.10608 8.03687L7.89392 9.87516ZM1.22219 10.3535L1.6161 9.43435L-0.222186 8.64651L-0.616105 9.56565L1.22219 10.3535ZM7.89392 12.1248L0.69696 9.04043L-0.0908789 10.8787L7.10608 13.9631L7.89392 12.1248ZM14.303 9.04043L7.10608 12.1248L7.89392 13.9631L15.0909 10.8787L14.303 9.04043ZM13.3839 9.43435L13.7778 10.3535L15.6161 9.56565L15.2222 8.64651L13.3839 9.43435ZM7.89392 12.8752L14.697 9.95957L13.9091 8.12128L7.10608 11.0369L7.89392 12.8752ZM0.30304 9.95957L7.10608 12.8752L7.89392 11.0369L1.09088 8.12128L0.30304 9.95957Z"
                  fill="#8C78EA"
                  mask="url(#path-1-inside-1_382_303666)"
                />
              </svg>
            ),
        },
      ],
      icon:
        selectedTitle?.props?.children === "Settings" ? (
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5 2C14.3284 2 15 2.67157 15 3.5V5H0V3.5C0 2.67157 0.671573 2 1.5 2H13.5Z"
              fill="#8C78EA"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 6V11.5C0 12.3284 0.671573 13 1.5 13L13.5 13C14.3284 13 15 12.3284 15 11.5V6H0ZM2 10H8V9H2V10ZM13 10H10V9H13V10Z"
              fill="#8C78EA"
            />
          </svg>
        ) : (
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.5 5.5H14.5M2 9.5H8M10 9.5H13M0.5 3.5L0.5 11.5C0.5 12.0523 0.947716 12.5 1.5 12.5L13.5 12.5C14.0523 12.5 14.5 12.0523 14.5 11.5V3.5C14.5 2.94772 14.0523 2.5 13.5 2.5L1.5 2.5C0.947716 2.5 0.5 2.94772 0.5 3.5Z"
              stroke="#8C78EA"
            />
          </svg>
        ),
    },
  ];

  const onMenuSelect = ({ keyPath }) => {
    const selectedItem = items
      .flatMap((item) => item.children || item)
      .find((item) => item.key === keyPath[0]);
    if (selectedItem) {
      setSelectedTitle(selectedItem.label);
    }
  };

  return (
    <Layout className="min-h-screen">
      <Sider className="bg-[#ffffff] p-4 w-[50%]">
        <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onSelect={onMenuSelect}
          className="w-full"
        />
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2" role="menuitem">
            <img src={avatar} alt="avatar" className="w-10 h-10 rounded-2xl" />
            <div>
              <h1 className="text-secondaryTitle text-sm font-work font-bold">
                Jenny
              </h1>
              <span className="text-gray50 text-xs font-nunito font-semibold">
                jenny@gmail.com
              </span>
            </div>
          </div>
          <Button
            type="text"
            variant="text"
            onClick={() => {
              removeCookie("token");
              message.success("Log out successful");
              navig("/login");
            }}
            // to="/login"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 7L9.5 10.25M12.5 7L9.5 4M12.5 7L3 7M7 13L0.5 13L0.500001 1L7 1"
                stroke="#D34635"
              />
            </svg>
          </Button>
        </div>
      </Sider>
      <Layout className="bg-offBg w-[50%]">
        <Header className="bg-offBg p-0 ml-4 pt-4 flex-row flex items-center justify-between mr-4">
          <h1 className="text-gray70 text-4xl font-work font-semibold">
            Hello, Jenny 👋🏼
          </h1>
          <svg
            width="47"
            height="47"
            viewBox="0 0 47 47"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="47" height="47" rx="12" fill="white" />
            <path
              d="M23.5 16C20.4624 16 18 18.4624 18 21.5V26H17V27H30V26H29V21.5C29 18.4624 26.5376 16 23.5 16Z"
              fill="#5D5D5D"
            />
            <path
              d="M21 28.5V28H26V28.5C26 29.8807 24.8807 31 23.5 31C22.1193 31 21 29.8807 21 28.5Z"
              fill="#5D5D5D"
            />
          </svg>
        </Header>
        <div></div>
        <Content className="m-4 bg-offBg rounded-lg p-6">
          {selectedTitle?.props?.children === "Listing" ? (
            <Listing />
          ) : selectedTitle?.props?.children === "Users" ? (
            <User />
          ) : selectedTitle?.props?.children === "Gamification" ? (
            <ManageQuests />
          ) : selectedTitle?.props?.children === "Categories" ? (
            <ManageCategory />
          ) : selectedTitle?.props?.children === "Transactions" ? (
            <Transactions />
          ) : selectedTitle?.props?.children === "Personal Information" ? (
            <PersonalInformation />
          ) : selectedTitle?.props?.children === "Communications" ? (
            <Communications />
          ) : selectedTitle?.props?.children === "FAQ" ? (
            <Faq />
          ) : selectedTitle?.props?.children === "Term & Conditions" ? (
            <TermsAndConditions />
          ) : (
            <Dashboard />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Body;
