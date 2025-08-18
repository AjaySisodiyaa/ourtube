import { FFmpeg } from "@ffmpeg/ffmpeg";

const ffmpeg = new FFmpeg({ log: true });

export const loadFFmpeg = async () => {
  if (!ffmpeg.loaded) {
    await ffmpeg.load({
      coreURL: process.env.PUBLIC_URL + "/ffmpeg/ffmpeg-core.js",
      wasmURL: process.env.PUBLIC_URL + "/ffmpeg/ffmpeg-core.wasm",
      // no workerURL needed for esm build
    });
  }
  return ffmpeg;
};

export default ffmpeg;
