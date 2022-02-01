const user1 = {
  name: "Elis",
  interests: [1, 1, 1, 0],
  weigths: [1, 0, 0, 1],
  gender: "male",
};
const user2 = {
  name: "Nisse",
  interests: [1, 1, 0, 0],
  weigths: [1, 1, 0, 0],
  gender: "male",
};
const user3 = {
  name: "Filippa",
  interests: [1, 0, 1, 1],
  weigths: [1, 1, 0, 1],
  gender: "female",
};
const user4 = {
  name: "Erika",
  interests: [1, 1, 0, 1],
  weigths: [1, 1, 2, 0],
  gender: "female",
};
const users = [user1, user2, user3, user4];

const getMatchScore = (user, matchee) => {
  let weights = user.weigths;
  let interests = matchee.interests;

  return interests
     .map((v, i) => v * weights[i])
     .reduce((sum, a) => sum + a, 0);
};

const getAllMatchScores = (users) => {
  let men = users.filter((user) => user.gender === "male");
  let women = users.filter((user) => user.gender === "female");

  let menMatches = [];
  let womenMatches = [];

  men.forEach(
     (man, i) =>
        (menMatches[i] = {
           name: man.name,
           matches: women.map((woman) => {
              return { match: woman.name, score: getMatchScore(man, woman) };
           }),
        })
  );

  women.forEach(
     (woman, i) =>
        (womenMatches[i] = {
           name: woman.name,
           matches: men.map((man) => {
              return { match: man.name, score: getMatchScore(woman, man) };
           }),
        })
  );

  return menMatches.concat(womenMatches);
};

let match = getAllMatchScores(users);

console.log(user1);
console.log(getMatchScore(user2, user1));
console.log(match[1]);
