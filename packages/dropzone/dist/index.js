var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// lib/index.tsx
import React, { useRef, useState } from "react";
var Dropzone = ({
  dropzoneTitle = "Upload your file",
  uploadButtonText = "Upload",
  uploadApiRoute,
  afterProcessed,
  acceptFileExtension
}) => {
  const [fileName, setFileName] = useState("");
  const hiddenFileInput = useRef(null);
  const handleSubmit = (e) => {
    var _a;
    e.preventDefault();
    (_a = hiddenFileInput.current) == null ? void 0 : _a.click();
  };
  const handleUpload = (e) => __async(void 0, null, function* () {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (file == null) {
      return;
    }
    setFileName(file == null ? void 0 : file.name);
    const formData = new FormData();
    formData.append("File", file);
    const parsedFileResponse = yield fetch(uploadApiRoute, {
      method: "POST",
      body: formData
    });
    const parsedFile = yield parsedFileResponse.json();
    afterProcessed(parsedFile);
  });
  return /* @__PURE__ */ React.createElement(
    "form",
    {
      className: "flex flex-col items-center justify-center border-2\n      border-dashed gap-6 p-4",
      onSubmit: handleSubmit
    },
    /* @__PURE__ */ React.createElement("label", { htmlFor: "UploadFileBtn", className: "text-xl font-semibold" }, dropzoneTitle),
    /* @__PURE__ */ React.createElement(
      "button",
      {
        id: "UploadFileBtn",
        className: "bg-black px-4 py-2 text-white rounded-md",
        type: "submit"
      },
      uploadButtonText
    ),
    /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "hidden",
        type: "file",
        ref: hiddenFileInput,
        onChange: handleUpload,
        accept: acceptFileExtension
      }
    ),
    Boolean(fileName) && /* @__PURE__ */ React.createElement("small", null, fileName)
  );
};
var lib_default = Dropzone;
export {
  lib_default as Dropzone
};
