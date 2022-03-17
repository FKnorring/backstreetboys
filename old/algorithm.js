import jsonusers from "./users.json";

const users = [...jsonusers.males, ...jsonusers.females];
//console.log(users)
//console.log(users[0].interests)
function getMatchScore(user, matchee) {
  let weights = user.weights;
  let interests = matchee.interests.map((v) => (v ? 1 : 0));
  return interests.map((v, i) => v * weights[i]).reduce((sum, a) => sum + a, 0);
};

function filterGender(list, gender) {
   return list.filter(user => user.gender != gender);
}

function bestMatch(user, matches) {
   return matches.reduce((prev, current) => {
      return getMatchScore(user, prev) > getMatchScore(user, current) ? prev : current
    })
}

function filterIds(list, id1, id2) {
   return list.filter(user => {
      return user.userId != id1 && user.userId != id2
   })
}

function getMatches (users) {
  let matches = [];
  while (users.length > 0) {
    let user = users[0];
    let possilbleMatches =  filterGender(users,user.gender)
    let match = bestMatch(user, possilbleMatches)
    users = filterIds(users, user.userId, match.userId);
    matches.push({matcher: user.name, matchee: match.name})
  }
  return matches
};

