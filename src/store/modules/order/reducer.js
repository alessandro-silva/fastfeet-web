import produce from 'immer';

const INITIAL_STATE = {};

export default function order(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {});
}
