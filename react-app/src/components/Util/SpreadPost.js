const SpreadPost = (user_id, post_id,spreads) => {
    let valArr = Object.values(spreads)
    let spreadsArr = [];
    for (let i = 0; i < valArr.length; i++) {
        let obj = valArr[i]
        spreadsArr.push(obj.spread_id)
    }
    console.log(spreadsArr, 'RETURN RESULT FOR SPREADPOST HELPER FUNCTION');
    return spreadsArr;
};
    export default SpreadPost;
