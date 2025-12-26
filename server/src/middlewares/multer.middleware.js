import multer from "multer";
import path from "path";
import fs from "fs";

/* ---------------- Temp Upload Directory ---------------- */
const uploadDir = path.join(process.cwd(), "public/temp");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/* ---------------- Storage ---------------- */
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

/* ---------------- File Filter ---------------- */
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/", "video/", "audio/"];

  const isAllowed = allowedTypes.some(type =>
    file.mimetype.startsWith(type)
  );

  if (isAllowed) {
    cb(null, true);
  } else {
    cb(
      new Error("Only image, video, and audio files are allowed"),
      false
    );
  }
};

/* ---------------- Multer Instance ---------------- */
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 500 * 1024 * 1024, // 300MB (for videos)
  },
});
