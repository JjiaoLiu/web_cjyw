async function getCount(collection, query = {}, limit = 10, obj = {}) {
  let skip = 0;
  let total = 0;
  while (true) {
    if (obj.isStop) break;
    let count = await collection.countDocuments(query, { limit, skip });
    total += count;
    skip += limit;
    console.log("getCount:", total);
    if (count < limit) break;
  }
  obj = void 0;
  return total;
}
