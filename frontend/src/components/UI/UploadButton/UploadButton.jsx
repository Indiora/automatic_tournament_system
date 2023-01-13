import React, { useState, useEffect } from "react";

function UploadButton(props) {
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [inputFile, setInputFile] = useState(null);

  useEffect(() => {
    setInputFile(document.getElementById("input-file"));
  }, []);

  const handleUpload = () => {
    inputFile?.click();
  };
  const handleDisplayFileDetails = () => {
    props.setInputFileValue(inputFile.files[0]);
    inputFile?.files && setUploadedFileName(inputFile.files[0].name);

  };
  return (
    <div>
      <label className="me-3">Choose file: </label>
      <input
        id="input-file"
        onChange={handleDisplayFileDetails}
        className="d-none"
        type="file"
      />
      <button
        type="button"
        onClick={handleUpload}
        className={`btn ${
          uploadedFileName ? "my_home_button" : "btn-outline-success"
        }`}
      >
        {uploadedFileName ? uploadedFileName : "Upload"}
      </button>
    </div>
  );
}

export default UploadButton;