import React, { useEffect, useState } from "react";
import DeleteModal from "../DeleteModal";
import { App, Modal, Popconfirm } from "antd";
import { useCookies } from "react-cookie";
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../api/categories";
import { QuestionCircleOutlined } from "@ant-design/icons";

const categories = [
  {
    name: "Cities",
    sub_categories: [{ name: "New York" }, { name: "Tokyo" }],
  },
];

function Categories() {
  const [categoryData, setCategoryData] = useState(categories);
  const [inputValue, setInputValue] = useState("");
  const [isDeleteCateModalVisible, setIsDeleteCateModalVisible] =
    useState(false);
  const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] =
    useState(false);
  const [category, setCategory] = useState("");
  const [currentSubcategories, setCurrentSubcategories] = useState([]);
  const [editCategoryIndex, setEditCategoryIndex] = useState(null); // Track which category is being edited
  const [deleteCategoryIndex, setDeleteCategoryIndex] = useState(null); // Track the category to be deleted
  const [cookies] = useCookies(["token"]);
  const { message } = App.useApp();

  useEffect(() => {
    async function setCategories() {
      const call = await getCategories(cookies.token);
      const res = call.data.data.data;
      if (res) {
        setCategoryData(res);
      }
      console.log(res);
      console.log("38", categories);
    }

    setCategories();
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddSubCategory = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      setCurrentSubcategories([...currentSubcategories, { name: inputValue }]);
      setInputValue("");
    }
  };

  const handleRemoveCategory = (categoryIndex) => {
    setCategoryData(categoryData.filter((_, i) => i !== categoryIndex));
  };

  const handleDeleteCategory = async () => {
    if (deleteCategoryIndex !== null) {
      const updatedCategories = categoryData.filter(
        (_, i) => i !== deleteCategoryIndex
      );
      // console.log(71);

      // console.log(categoryData[deleteCategoryIndex].id);

      try {
        const call = await deleteCategory(
          cookies.token,
          categoryData[deleteCategoryIndex].id
        );
        console.log(call);
      } catch (error) {
        console.error(error);
      }

      setCategoryData(updatedCategories);
      setIsDeleteCateModalVisible(false);
      setDeleteCategoryIndex(null); // Reset delete index
    }
  };

  const handleCancel = () => {
    setIsAddCategoryModalVisible(false);
    setIsDeleteCateModalVisible(false); // Close delete modal as well
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();

    if (editCategoryIndex == null) {
      //! THis is for adding new categories
      const newCategory = {
        name: category,
        subcategories: currentSubcategories,
        icon: null,
      };

      try {
        const call = await addCategory(cookies.token, newCategory);
        console.log("called: ", call);

        if (call.success) {
          message.success("successfully added");
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (
      category.trim() !== "" &&
      currentSubcategories.length > 0 &&
      editCategoryIndex != null
    ) {
      //! THis is for editing categories
      const newCategory = {
        // eslint-disable-next-line no-restricted-globals
        name: categoryData[editCategoryIndex].name,
        sub_categories: currentSubcategories,
      };
      if (editCategoryIndex !== null) {
        // Update existing category
        const updatedCategories = [...categoryData];
        updatedCategories[editCategoryIndex] = newCategory;
        setCategoryData(updatedCategories);
      } else {
        // Add new category
        setCategoryData([...categoryData, newCategory]);
      }
      setCategory("");
      setCurrentSubcategories([]);
      setIsAddCategoryModalVisible(false);
      setEditCategoryIndex(null); // Reset edit index

      try {
        const knowableCategories = {
          name: newCategory.name,
          icon: null,
          subcategories: [],
        };
        console.log("New Category ", newCategory);

        newCategory.sub_categories.forEach((subcategory) => {
          // knowableCategories.subcategories.push([subcategory.name]);
          knowableCategories.subcategories.push({ name: subcategory.name });
        });

        console.log("checkCategoryData");

        console.log(knowableCategories);

        const call = await updateCategory(
          cookies.token,
          knowableCategories,
          categoryData[editCategoryIndex].id
        );
        console.log(call);

        if (call.success) {
          message.success(newCategory.name, "updated successfully");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEditCategory = (index) => {
    const categoryToEdit = categoryData[index];
    setCategory(categoryToEdit.name);
    setCurrentSubcategories(categoryToEdit.sub_categories);
    setEditCategoryIndex(index); // Set the category index being edited
    setIsAddCategoryModalVisible(true);
  };

  const handleDeleteButtonClick = (index) => {
    setDeleteCategoryIndex(index); // Set the index of the category to delete
    setIsDeleteCateModalVisible(true);
  };

  return (
    <div>
      <div className="flex flex-row items-center gap-y-3">
        <div className="my-4">
          <svg
            onClick={() => setIsAddCategoryModalVisible(true)}
            className="cursor-pointer"
            width="80"
            height="80"
            viewBox="0 0 49 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_1484_14411)">
              <rect
                x="0.878906"
                y="0.5"
                width="47"
                height="47"
                rx="17.5"
                stroke="#E8E8EA"
                stroke-dasharray="4 4"
              />
              <path d="M24.8789 18V31M18.3789 24.5H31.3789" stroke="#1D1929" />
            </g>
            <defs>
              <clipPath id="clip0_1484_14411">
                <rect
                  x="0.378906"
                  width="48"
                  height="48"
                  rx="18"
                  fill="white"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>

      <div>
        <h2 className="text-black text-xl mt-3 font-semibold">
          Your categories and subcategories
        </h2>
        {categoryData &&
          categoryData.map((item, index) => (
            <div key={index} className="flex flex-row gap-2 mt-4">
              <div className="flex flex-row justify-between border border-gray90 w-full p-4 rounded-2xl">
                <div className="w-8/12">
                  <div>
                    <span className="text-black text-xl font-bold">
                      {item.name}
                    </span>
                  </div>

                  <div className="mt-3">
                    <div className="flex flex-row gap-2">
                      {item.sub_categories.map((sub, subIndex) => (
                        <div
                          key={subIndex}
                          className="bg-gray90 px-2 py-1 rounded-2xl"
                        >
                          <span>{sub.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-4/12 flex flex-row justify-end gap-2">
                  <svg
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 122.88 121.51"
                    width={"16"}
                    height={"16"}
                    fill="#7F6DD5"
                    className="cursor-pointer"
                    onClick={() => handleEditCategory(index)} // Pass the index of the category to edit
                  >
                    <path d="M28.66,1.64H58.88L44.46,16.71H28.66a13.52,13.52,0,0,0-9.59,4l0,0a13.52,13.52,0,0,0-4,9.59v76.14H91.21a13.5,13.5,0,0,0,9.59-4l0,0a13.5,13.5,0,0,0,4-9.59V77.3l15.07-15.74V92.85a28.6,28.6,0,0,1-8.41,20.22l0,.05a28.58,28.58,0,0,1-20.2,8.39H11.5a11.47,11.47,0,0,1-8.1-3.37l0,0A11.52,11.52,0,0,1,0,110V30.3A28.58,28.58,0,0,1,8.41,10.09L8.46,10a28.58,28.58,0,0,1,20.2-8.4ZM73,76.47l-29.42,6,4.25-31.31L73,76.47ZM57.13,41.68,96.3.91A2.74,2.74,0,0,1,99.69.38l22.48,21.76a2.39,2.39,0,0,1-.19,3.57L82.28,67,57.13,41.68Z" />
                  </svg>

                  <svg
                    className="cursor-pointer"
                    onClick={() => handleDeleteButtonClick(index)} // Open delete modal for selected category
                    width="16"
                    height="15"
                    viewBox="0 0 16 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.77441 3V1.5C4.77441 0.947715 5.22213 0.5 5.77441 0.5H9.77441C10.3267 0.5 10.7744 0.947715 10.7744 1.5V3M0.274414 3.5H15.2744M1.77441 3.5V13.5C1.77441 14.0523 2.22213 14.5 2.77441 14.5H12.7744C13.3267 14.5 13.7744 14.0523 13.7744 13.5V3.5M7.77441 7V12M4.77441 9V12M10.7744 9V12"
                      stroke="#E5557C"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
      </div>

      <Modal
        open={isAddCategoryModalVisible}
        onCancel={handleCancel}
        onOk={handleAddCategory}
        width={"70%"}
      >
        <div>
          <h1 className="text-2xl text-black font-semibold font-work">
            {editCategoryIndex !== null
              ? "Edit your category and subcategories"
              : "Add your category and subcategories"}
          </h1>
          <form className="mt-4" onSubmit={handleAddCategory}>
            <div className="mb-3 gap-2 border border-gray-90 px-4 py-4 rounded-xl flex-row flex items-center">
              <input
                type="text"
                placeholder="Category"
                className="w-full focus:outline-none"
                value={category}
                onChange={handleCategoryChange}
              />
            </div>
            <div className="mb-3 gap-2 border border-gray-90 px-4 py-2 rounded-xl flex-row flex items-center">
              <input
                type="text"
                placeholder="Sub Category"
                className="w-full focus:outline-none"
                value={inputValue}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="rounded-xl px-4 py-2 cursor-pointer font-semibold font-work text-white bg-primary border border-primary"
                onClick={handleAddSubCategory}
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {currentSubcategories.map((sub, index) => (
                <div
                  key={index}
                  className="flex items-center bg-secondary rounded-xl px-4 py-2"
                >
                  <span className="text-primary font-semibold">{sub.name}</span>
                  <Popconfirm
                    title="Delete this Sub category?"
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                    okText="Delete"
                    cancelText="No"
                    onConfirm={() => {
                      setCurrentSubcategories(
                        currentSubcategories.filter((_, i) => i !== index)
                      );
                    }}
                  >
                    <button
                      className="ml-2 bg-primary text-white w-4 h-4 rounded-full font-bold text-[8px]"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      ✕
                    </button>
                  </Popconfirm>
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="rounded-xl w-full mt-4 py-2 cursor-pointer font-semibold font-work text-white bg-primary border border-primary"
            >
              {editCategoryIndex !== null ? "Update" : "Add"}
            </button>
          </form>
        </div>
      </Modal>

      <DeleteModal
        handleOk={handleDeleteCategory}
        handleCancel={() => setIsDeleteCateModalVisible(false)}
        isVisible={isDeleteCateModalVisible}
        title={"Are you sure you want to delete this category?"}
      />
    </div>
  );
}

export default Categories;
