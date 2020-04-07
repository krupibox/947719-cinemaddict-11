const FILM_DESCRIPTIONS =
`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
 + `Cras aliquet varius magna, non porta ligula feugiat eget. `
 + `Fusce tristique felis at fermentum pharetra. `
 + `Aliquam id orci ut lectus varius viverra. `
 + `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. `
 + `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. `
 + `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. `
 + `Sed sed nisi sed augue convallis suscipit in sed felis. `
 + `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

export const WORDS = FILM_DESCRIPTIONS.toLowerCase().replace(/[.,]/g, ``).split(` `);

export const POSTERS = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

export const NICKNAMES = [
  {alias: `film lover`, rank: 10},
  {alias: `film addict`, rank: 50},
  {alias: `film buff`, rank: 100},
  {alias: `film geek`, rank: 300},
  {alias: `film maniac`, rank: 500},
];
