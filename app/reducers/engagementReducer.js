
export default function engagementReducer(state = [], action) {
  switch (action.type) {
    case 'RECEIVE_ENGAGEMENT_BY_USER':
    state = action.count.reduce((arr, user) => {
      arr.push({ name: user.group, engagement: user.reduction })
      return arr;
    }, []);
    return state.sort((a, b) => b.engagement - a.engagement);
    default:
    return state;
  }
}
