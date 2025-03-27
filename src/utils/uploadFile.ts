import fs from "node:fs/promises";

export async function uploadFile(file: File, filename: string) {
    const defaultName = file.name.split(".")[0];

    if (!file.type.includes("image"))
        return { message: `The file is not image.` };


    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const fullpath = `./public/uploads/${filename ?? defaultName}.jpg`;
    await fs.writeFile(fullpath, buffer);
}