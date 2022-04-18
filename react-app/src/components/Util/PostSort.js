
function PostSort(spreaded) {
    if (!spreaded) {
        spreaded = {empty: true}
    }
    let postsArr = [];
  let filteredvar = [];
  let postfilterArr = [];
  postsArr = Object?.values(spreaded);
  for (let i = 0; i < postsArr.length; i++) {
      let ele = postsArr[i];
      if (!postfilterArr?.includes(ele?.post_id)) {
          postfilterArr.push(ele?.post_id)
          filteredvar.push(ele)
      }
  }
  return {postfilterArr: postfilterArr, filteredvar: filteredvar}
}

export default PostSort;
