import { Avatar, Box, Button, Slider } from "@material-ui/core";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Dialog from "@mui/material/Dialog";
import React, { useState } from "react";
import AvatarEditor from "react-avatar-editor";
import styled from "styled-components";
const CoverCrop = () => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setPictureCover({
      ...pictureCover,
      cropperOpen: false,
    });
    console.log(1111, pictureCover.cropperOpen);
  };

  var editor = "";
  const [pictureCover, setPictureCover] = useState({
    cropperOpen: false,
    img: null,
    zoom: 2,
    croppedImg:
      "https://upload.wikimedia.org/wikipedia/commons/0/09/Man_Silhouette.png",
  });

  const handleSlider = (event, value) => {
    setPictureCover({
      ...pictureCover,
      zoom: value,
    });
  };

  const handleCancel = () => {
    setPictureCover({
      ...pictureCover,
      cropperOpen: false,
    });
  };

  const setEditorRef = (ed) => {
    editor = ed;
  };

  const handleSave = (e) => {
    if (setEditorRef) {
      const canvasScaled = editor.getImageScaledToCanvas();
      const croppedImg = canvasScaled.toDataURL();

      setPictureCover({
        ...pictureCover,
        img: null,
        cropperOpen: false,
        croppedImg: croppedImg,
      });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length !== 0) {
      let url = URL.createObjectURL(e.target.files[0]);
      setPictureCover({
        ...pictureCover,
        img: url,
        cropperOpen: true,
      });
    }
  };

  const handleClickChooseFile = () => {
    document.getElementById("getFilee").click();
    setOpen(true);
  };
  return (
    <div>
      <Box display="flex" justifyContent="center">
        <Box width="100%" maxHeight="230px" style={{ position: "relative" }}>
          <Avatar
            src={pictureCover.croppedImg}
            style={{
              width: "100%",
              height: "auto",
              padding: "5",
              maxHeight: "230px",
              borderRadius: "0px",
            }}
          />
          <BtnChangeCover onClick={handleClickChooseFile}>
            <CameraAltIcon style={{ width: "18px", marginRight: "10px" }} />{" "}
            Change Cover
          </BtnChangeCover>
          <input
            type="file"
            accept="image/*"
            id="getFilee"
            onChange={handleFileChange}
            style={{ color: "transparent", display: "none" }}
          />
        </Box>

        {pictureCover.cropperOpen && (
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <Box display="block" style={{ width: "100%" }}>
              <AvatarEditor
                ref={setEditorRef}
                image={pictureCover.img}
                width={830}
                height={100}
                border={50}
                color={[255, 255, 255, 0.6]} // RGBA
                rotate={0}
                scale={pictureCover.zoom}
                style={{ width: "100%" }}
              />
              <Slider
                aria-label="raceSlider"
                value={pictureCover.zoom}
                min={1}
                max={10}
                step={0.1}
                onChange={handleSlider}
              ></Slider>
              <Box>
                <Button variant="contained" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save</Button>
              </Box>
            </Box>
          </Dialog>
        )}
      </Box>
    </div>
  );
};

export default CoverCrop;

export const BtnChangeCover = styled.div`
  position: absolute;
  right: 12px;
  top: 12px;

  display: flex;
  align-items: center;
  background: #f2f2f2;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  border: none;
  color: #4f4f4f;
  font-weight: 500;
  font-size: 12px;
`;
