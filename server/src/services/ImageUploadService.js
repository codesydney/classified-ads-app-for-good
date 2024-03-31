const { S3Client } = require('@aws-sdk/client-s3')
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
    Key: `uploads/${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  }

  try {
    const parallelUploads3 = new Upload({
      client: s3Client,
      params: uploadParams,
    })

    const result = await parallelUploads3.done()
    return result.Location
  } catch (err) {
    console.error('Error uploading file to S3', err)
    throw new Error('Failed to upload image to S3')
  }
}

module.exports = { uploadImageToS3 }
