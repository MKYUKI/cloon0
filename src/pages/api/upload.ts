// src/pages/api/upload.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: '画像のアップロードに失敗しました。' });
    }

    const file = files.file as formidable.File;

    if (!file) {
      return res.status(400).json({ message: 'ファイルが見つかりません。' });
    }

    try {
      const result = await cloudinary.v2.uploader.upload(file.filepath, {
        folder: 'profiles',
      });

      // 一時ファイルを削除
      fs.unlinkSync(file.filepath);

      res.status(200).json({ url: result.secure_url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '画像のアップロード中にエラーが発生しました。' });
    }
  });
}
