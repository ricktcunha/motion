import {AtlasFilm} from './AtlasFilm';
import config from './project.json';

export const atlasProject = {
  config,
  compositions: [
    {...config.composition, component: AtlasFilm},
    {
      id: config.styleFrame.id,
      width: config.composition.width,
      height: config.composition.height,
      fps: config.composition.fps,
      durationInFrames: 1,
      defaultProps: config.styleFrame.defaultProps,
      component: AtlasFilm,
    },
  ],
} as const;
