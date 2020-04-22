import { TilerTheCreator } from "./TilerTheCreator.js";
const createTiling = new TilerTheCreator({width: 100, height: 100, scale_factor: 50, type: 77});

createTiling.readyToTile();
const polygons = createTiling.getPolygonsFromRegion();

if (polygons.length > 0) {
    console.log("Tiler working fine");
} else {
    console.error("No Polygons returned from Tiler");
}