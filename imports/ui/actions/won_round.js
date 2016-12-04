/* eslint-env browser */

export default function wonRound(userId) {
  return () => {
    document.querySelector('.mdl-snackbar').MaterialSnackbar.showSnackbar({
      message: `game won by ${userId}`
    })
  }
}
