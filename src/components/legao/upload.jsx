import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Upload, message } from 'antd'
import {
  updateFileList,
  updateImageUrl,
  updateUploadedImageMD5,
  updateResultImage
} from './actions'
const { Dragger } = Upload

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt5M = file.size / 1024 / 1024 < 5
  if (!isLt5M) {
    message.error('Image must smaller than 5MB!')
  }
  return isJpgOrPng && isLt5M
}

export default function UploadDragger() {
  const dispatch = useDispatch()
  const imageUrl = useSelector(state => state.imageUrl)
  const fileList = useSelector(state => state.fileList)
  const handleChange = info => {
    let fileList = [...info.fileList]
    fileList = fileList.slice(-1)
    dispatch(updateFileList(fileList))
    switch (info.file.status) {
      case 'done':
        message.success(`${info.file.name} file uploaded successfully.`)
        getBase64(info.file.originFileObj, imageUrl =>
          dispatch(updateImageUrl(imageUrl))
        )
        const md5 = info.file.response['md5']
        dispatch(updateUploadedImageMD5(md5))
        dispatch(updateResultImage(null))
        break
      case 'uploading':
        break
      case 'error':
        message.error(`${info.file.name} file upload failed.`)
        break
      default:
        break
    }
  }
  const draggerprops = {
    name: 'file',
    action: 'https://api.adrian-gao.com/legao/upload',
    beforeUpload: beforeUpload,
    onChange: handleChange,
    showUploadList: false,
    multiple: false,
    accept: 'image/*',
    style: { minHeight: '178px', padding: '10px' }
  }
  return (
    <Dragger {...draggerprops} fileList={fileList}>
      {imageUrl ? (
        <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
      ) : (
        <div>
          <p className="ant-upload-text">
            Click or drag a picture to this area to upload
          </p>
          <p className="ant-upload-hint">
            Please keep image size no larger than 5MB.
          </p>
          <p className="ant-upload-hint">
            Uploaded image will be deleted after 5 mins.
          </p>
        </div>
      )}
    </Dragger>
  )
}
