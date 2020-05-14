export function orderInRequest(order) {
  return {
    type: '@order/ORDER_IN_REQUEST',
    payload: { order },
  };
}

export function orderInSuccess(order) {
  return {
    type: '@order/ORDER_IN_SUCCESS',
    payload: { order },
  };
}

export function orderFailure() {
  return {
    type: '@order/ORDER_FAILURE',
  };
}
