export const updateMaxLength = data => {
  return {
    type: "UPDATE_MAXLENGTH",
    payload: data
  };
};

export const updateBrickEffect = data => {
  return {
    type: "UPDATE_BRICKEFFECT",
    payload: data
  };
};

export const updateUploadedImageMD5 = data => {
  return {
    type: "UPDATE_UPLOADEDIMAGEMD5",
    payload: data
  };
};

export const updateImageUrl = data => {
  return {
    type: "UPDATE_IMAGEURL",
    payload: data
  };
};
export const updateFileList = data => {
  return {
    type: "UPDATE_FILELIST",
    payload: data
  };
};

export const waitingServer = status => {
  return {
    type: "UPDATE_WAITING_SERVER",
    payload: status
  };
};

export const updateResultImage = data => {
  return {
    type: "UPDATE_RESULTIMAGE",
    payload: data
  };
};

export const updateStats = data => {
  return {
    type: "UPDATE_STATS",
    payload: data
  };
};

export const updateColorNames = data => {
  return {
    type: "UPDATE_COLORNAMES",
    payload: data
  };
};

export const updatePalettes = data => {
  return {
    type: "UPDATE_PALETTES",
    payload: data
  };
};
