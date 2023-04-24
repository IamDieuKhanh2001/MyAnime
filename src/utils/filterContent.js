import BadWords from 'bad-words';

const filter = new BadWords();
const additionalBadWords = ["cac", "me", "dit", "rac", "shit", "matday", "lon", "clgt", "oc", "cho", "dog", "vc", "vl", "tre trau", "oc cho", "cuc", "cut"];
filter.addWords(...additionalBadWords);

export const filterContent = (content) => {
  return filter.clean(content);
};

