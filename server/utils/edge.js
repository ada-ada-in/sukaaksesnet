import { Edge } from "edge.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const edge = Edge.create({ cache: false });

edge.mount(path.join(__dirname, "../../views"));
