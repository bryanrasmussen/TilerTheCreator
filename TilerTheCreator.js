
import { mul, tilingTypes, IsohedralTiling } from 'tactile-js/lib/tactile.js';

export const TilerTheCreator = function(options) {
	let {width, height, scale_factor = 10, buffer = 5} = options;
	let edges = [];
	let tilingType = (options.type) ? options.type : 0;
	let name = (options.name) ? options.name : "Unnamed Tiling #" + tilingType + " width=" + width + " height=" + height;
	
	const tiling = new IsohedralTiling( tilingTypes[tilingType]);

	let tile_shape = [];
	//clear - return to Default States

    const clearTileShape = () => {
        tile_shape = [];
	}
  
    const clearCurrentEdges = () => {
        edges = [];
	}
	
	//getters
	const getTileType = () => {
        return tilingType;
    }
    const getCurrentEdges = () => {
        return edges;
    }
	const getName = () => {
		return name;
	}

	const getCurrentTiling = () => {
        return tiling;
    }
    const getTileShape = () => {
        return tile_shape;
	}

	const getTransform = (polygon) => {
		const aspectTransform = tiling.getAspectTransform(tiling.numAspects() - 1);
		return "";
	}
	//setters
	const setNewWidth = (w) => {
		width = w;
	}
	const setNewHeight = (h) => {
		height = h;
	}
	
	const setEdges = (insertEdges) => {
		if (insertEdges) {
			edges = insertEdges;
			return;
		}
		for( let idx = 0; idx < tiling.numEdgeShapes(); ++idx ) {

			edges.push( [{ x: 0, y: 0 }, { x: 1, y: 0 }] );
		}
	}

	const setNewTilingType = (tile_type) => {
		tilingType = tile_type;
		tiling.reset(tiling_type)
		setEdges();
	}

	const setScale = (scale) => {
		if (scale < 0 || ((scale + 1) - 1) !== scale) {
			console.warn("Scale should be a positive number");
			return;
		}
		scale_factor = scale;
	}

	//drawing functions
	const cacheTileShape = (local_tile_shape = []) =>
	{   
		const parts = tiling.parts();
		for( let part of parts ) {
			const ej = edges[part.id];
			const rev = part.rev;
			let cur = rev ? (ej.length-2) : 1;
			const inc = rev ? -1 : 1;
			let index = 0;
			for( ; index < ej.length - 1; index++ ) {
				local_tile_shape.push( mul( part.T, ej[cur] ) );
				cur += inc;
			}
		}
		tile_shape = local_tile_shape;
	}

	const addToTileShape = () => {
		cacheTileShape(tile_shape);
	}

	const readyToTile = () => {
		setEdges();
		cacheTileShape();
	}

	const getPolygonsFromRegion = () => {
		const tile_shape = getTileShape();
		const polygons = [];
	
		
		const M = [scale_factor, 0, 0, 0, scale_factor, 0];
		for( let i of  tiling.fillRegionBounds(-buffer, -buffer, width/ (scale_factor  + (2 * buffer)), height / (scale_factor  + (2 * buffer)))) {
			const TT = i.T;
			const T = mul(M, TT );
			const singlePolygon = [];
			tile_shape.forEach((shape) => {
				const P = mul( T, shape );
				singlePolygon.push([P.x, P.y]);
			});

			polygons.push(singlePolygon);
			
		};
		return polygons;
	}


	return {
		//go to default state
		clearTileShape,
		clearCurrentEdges,
		//getters
		getCurrentEdges,
		getCurrentTiling,
		getName,
		getTileShape,
		getTileType,
		getPolygonsFromRegion,
		getTransform,
		//Setters
		setScale,
		setEdges,
		setNewHeight,
		setNewTilingType,
		setNewWidth,
		//drawing functions
		readyToTile,
		cacheTileShape,
		addToTileShape
		}

}