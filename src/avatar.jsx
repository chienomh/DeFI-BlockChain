import { Avatar, Box, Button, Slider } from "@material-ui/core";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Dialog from "@mui/material/Dialog";
import React, { useState } from "react";
import AvatarEditor from "react-avatar-editor";
import styled from "styled-components";
import cc from "./imageNull.png";
const AvatarCrop = () => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  var editor = "";
  const [picture, setPicture] = useState({
    cropperOpen: false,
    img: null,
    zoom: 2,
    croppedImg:
      "https://upload.wikimedia.org/wikipedia/commons/0/09/Man_Silhouette.png",
  });

  const handleSlider = (event, value) => {
    setPicture({
      ...picture,
      zoom: value,
    });
  };

  const handleCancel = () => {
    setPicture({
      ...picture,
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
      console.log(croppedImg);
      setPicture({
        ...picture,
        img: null,
        cropperOpen: false,
        croppedImg: croppedImg,
      });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length !== 0) {
      let url = URL.createObjectURL(e.target.files[0]);
      setPicture({
        ...picture,
        img: url,
        cropperOpen: true,
      });
    }
  };

  const handleClickChooseFile = () => {
    document.getElementById("getFile").click();
    setOpen(true);
  };
  return (
    <div>
      <Box display="flex" justifyContent="center">
        <Box width="132px" style={{ position: "relative" }}>
          <Avatar
            src={picture.croppedImg}
            style={{
              width: "100%",
              height: "auto",
              padding: "5",
              border: "2px solid #171A23",
            }}
          />
          <BtnChangeAvatar onClick={handleClickChooseFile}>
            <CameraAltIcon style={{ width: "18px" }} />
          </BtnChangeAvatar>
          <input
            type="file"
            accept="image/*"
            id="getFile"
            onChange={handleFileChange}
            style={{ color: "transparent", display: "none" }}
          />
        </Box>

        {picture.cropperOpen && (
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <Box display="block">
              <AvatarEditor
                ref={setEditorRef}
                image={picture.img}
                width={200}
                height={200}
                border={50}
                color={[255, 255, 255, 0.6]} // RGBA
                rotate={0}
                scale={picture.zoom}
                borderRadius={200}
              />
              <Slider
                aria-label="raceSlider"
                value={picture.zoom}
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

export default AvatarCrop;

export const BtnChangeAvatar = styled.div`
  width: 36px;
  height: 35px;
  border-radius: 100%;
  border: 2px solid #171a23;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0px;
  bottom: 0px;
  background-color: #e0e0e0;
`;
