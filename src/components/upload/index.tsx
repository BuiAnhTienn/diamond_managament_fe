import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ChangeEvent, useEffect, useState } from "react";
import { storage } from "../../utils/FirebaseConfig";
import Input from "antd/es/input/Input";
import { UploadContainer } from "./style";
import { DeleteOutlined } from "@ant-design/icons";
import noImage from "@assets/no_image.jpg";
import { v4 } from "uuid";

interface IUpload {
  maxCount?: number;
  onChange?: (uploadLink?: string) => void;
  value?: string;
  disabled?: boolean;
}

const Upload = ({ onChange, value, disabled }: IUpload) => {
  const [uploadLink, setUploadLink] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files && event.target.files[0];
      if (file && isImageFile(file)) {
        setErrorMessage(undefined);
        const imageRef = ref(storage, `image/${file.name + v4()}`);
        await uploadBytes(imageRef, file);
        const downloadURL = await getDownloadURL(imageRef);
        setUploadLink(downloadURL);
      } else {
        setErrorMessage("You must provide an image file.");
        setUploadLink(undefined);
      }
    } catch (error) {}
  };

  useEffect(() => {
    onChange && onChange(uploadLink);
  }, [uploadLink]);

  useEffect(() => {
    value && setUploadLink(value);
  }, [value]);

  const isImageFile = (file: File) => {
    return file.type.startsWith("image/");
  };

  const uploadId = v4();

  return (
    <UploadContainer>
      <div className="flex items-center">
        <div className="border-2 border-dashed w-[200px] h-[200px]">
          <img
            src={uploadLink || value || noImage}
            className="w-[10%] h-[auto]"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
        <div className="min-w-[100px]">
          {uploadLink && !disabled && (
            <div
              onClick={() => setUploadLink("")}
              className="mx-10 cursor-pointer"
            >
              <DeleteOutlined />
            </div>
          )}
        </div>
        <label htmlFor={`upload-button ${uploadId}`}>
          <Input
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id={`upload-button ${uploadId}`}
          />
          <div className="upload-btn">Upload</div>
        </label>
      </div>
      <div>
        <p style={{ display: "block" }}>{errorMessage}</p>
      </div>
    </UploadContainer>
  );
};

export default Upload;
