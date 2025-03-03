const bucket = require('../../../config/bucket.js');
const {v4: uuidv4} = require('uuid');

const uploadFile = async (file) => {
  const ref = bucket.storage().bucket(process.env.BUCKET_NAME);
  const storage = await ref.upload(file.path, {
    public: true,
    destination: `/uploads/${Date.now() + '-' +file.originalname}`,
    metadata: {
      firebaseStorageDownloadTokens: uuidv4(),
    },
  });
  return storage[0].metadata.mediaLink.toString();
};

const deleteFile = async (file) => {
  if (!file) return;
  const path = file.split('/o/')[1];
  const decodedPath = decodeURIComponent(path);
  const ref = bucket.storage().bucket(process.env.BUCKET_NAME);
  await ref.file(decodedPath.split('?')[0]).delete();
};

module.exports = {uploadFile, deleteFile};
