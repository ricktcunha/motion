import {AtlasV2Film} from './AtlasV2Film';
import config from './project.json';

export const atlasV2Project = {config, compositions: [{...config.composition, component: AtlasV2Film}]} as const;
