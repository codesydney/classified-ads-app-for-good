const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3')
const { Upload } = require('@aws-sdk/lib-storage')
require('dotenv').config()

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

const uploadImageToS3 = async (file, bucketName) => {
  const uploadParams = {
    Bucket: bucketName,
    Key: `images/${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  }

  console.log('uploadParams', uploadParams)
  console.log('process.env.AWS_REGION', process.env.AWS_REGION)
  console.log('process.env.AWS_ACCESS_KEY_ID', process.env.AWS_ACCESS_KEY_ID)
  console.log('process.env.AWS_SECRET', process.env.AWS_SECRET_ACCESS_KEY)

  try {
    const parallelUploads3 = new Upload({
      client: s3Client,
      params: uploadParams,
    })

    const result = await parallelUploads3.done()

    console.log('result', result)

    return result.Location
  } catch (err) {
    console.error('Error uploading file to S3', err)
    throw new Error('Failed to upload image to S3')
  }
}

const deleteImageFromS3 = async (url, bucketName) => {
  // Extract key from url
  const urlSegments = url.split('/')
  const key = urlSegments.slice(4).join('/')

  // Deletion params
  const params = {
    Bucket: bucketName,
    Key: key,
  }
  const command = new DeleteObjectCommand(params)

  try {
    const response = await s3Client.send(command)
    return response
  } catch (error) {
    console.error('Error deleting file to S3', error)
    throw new Error('Failed to delete image from s3')
  }
}

module.exports = { uploadImageToS3, deleteImageFromS3 }
