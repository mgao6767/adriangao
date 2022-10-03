import { combineReducers } from 'redux'

const maxLengthReducer = (state = 50, action) => {
  switch (action.type) {
    case 'UPDATE_MAXLENGTH':
      return action.payload
    default:
      return state
  }
}

const brickEffectReducer = (state = 'all', action) => {
  switch (action.type) {
    case 'UPDATE_BRICKEFFECT':
      return action.payload
    default:
      return state
  }
}

const waitingServerReducer = (state = false, action) => {
  switch (action.type) {
    case 'UPDATE_WAITING_SERVER':
      return action.payload
    default:
      return state
  }
}

const uploadedImageMD5Reducer = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE_UPLOADEDIMAGEMD5':
      return action.payload
    default:
      return state
  }
}

const updateFileListReducer = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_FILELIST':
      return action.payload
    default:
      return state
  }
}

const updateImageUrlReducer = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE_IMAGEURL':
      return action.payload
    default:
      return state
  }
}

const updateResultImageReducer = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE_RESULTIMAGE':
      return action.payload
    default:
      return state
  }
}

const updateStatsReducer = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE_STATS':
      return action.payload
    default:
      return state
  }
}

const updateColorNamesReducer = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE_COLORNAMES':
      return action.payload
    default:
      return state
  }
}

const updatePalettesReducer = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE_PALETTES':
      return action.payload
    default:
      return state
  }
}

export const allReducers = combineReducers({
  waitingServer: waitingServerReducer,
  maxLength: maxLengthReducer,
  brickEffect: brickEffectReducer,
  uploadedImageMD5: uploadedImageMD5Reducer,
  fileList: updateFileListReducer,
  imageUrl: updateImageUrlReducer,
  resultImage: updateResultImageReducer,
  stats: updateStatsReducer,
  colorNames: updateColorNamesReducer,
  palettes: updatePalettesReducer
})
