import React, { useState, useEffect } from "react";
import JoditEditor from "jodit-react";
import { useCookies } from "react-cookie";
import { fetchTnc, postTnc } from "../api/settings";
import { App } from "antd";

const TermsAndConditions = () => {
  // State to store the terms and conditions content
  const [termsContent, setTermsContent] = useState("");
  const [cookies] = useCookies(["token"]);
  const { message } = App.useApp();

  useEffect(() => {
    async function GetTNC() {
      try {
        const call = await fetchTnc(cookies.token);

        setTermsContent(call.data.content);
      } catch (error) {
        console.error(error);
        setTermsContent("");
      }
    }

    GetTNC();
  }, []);

  // Configuration for Jodit editor
  const editorConfig = {
    readonly: false, // Allows editing
    toolbarSticky: true, // Keeps toolbar sticky while scrolling
    height: 400, // Set the height of the editor
    // You can add more custom configurations here
  };

  // Simulate fetching initial Terms and Conditions from an API or database
  useEffect(() => {
    const fetchTerms = () => {
      // Simulating fetching data (replace with actual API call)
      const initialTerms =
        "<h2>Terms and Conditions</h2><p>Your terms and conditions content goes here...</p>";
      setTermsContent(initialTerms);
    };

    fetchTerms();
  }, []);

  // Handle changes to the editor content
  const handleEditorChange = (newContent) => {
    setTermsContent(newContent);
  };

  // Simulate saving the updated terms (you can replace this with an API call)
  const handleSave = async () => {
    // For demonstration, just log the updated content

    const call = await postTnc(cookies.token, { content: termsContent });
    console.log(call);
    message.success("Terms and Conditions Updated Successfully");
  };

  return (
    <div className="terms-and-conditions">
      <h1 className="text-black text-2xl font-work font-semibold">
        Terms and Conditions
      </h1>
      <p className="text-gray100 text-sm font-work font-medium mb-6">
        Edit the content below to update your terms and conditions.
      </p>

      {/* Jodit Editor */}
      <JoditEditor
        value={termsContent}
        config={editorConfig}
        onChange={handleEditorChange}
      />

      {/* Save Button */}
      <div style={{ marginTop: "20px" }}>
        <button
          type="button"
          className="rounded-xl w-full mt-4 py-2 cursor-pointer font-semibold font-work text-white bg-primary border border-primary"
          onClick={handleSave}
        >
          Update
        </button>
      </div>

      {/* Display updated terms (optional) */}
      <div style={{ marginTop: "30px" }}>
        <h3 className="text-black text-2xl font-work font-semibold mb-6">
          Preview Updated Content:
        </h3>
        <div dangerouslySetInnerHTML={{ __html: termsContent }} />
      </div>
    </div>
  );
};

export default TermsAndConditions;
