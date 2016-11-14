// Meteor.methods({
//   newgame: function(name) {
//     Games.insert({
//       name: name,
//       whiteDeck: newDeck('white'),
//       blackDeck: newDeck('black'),
//       table: {
//         cards: []
//       },
//       players: []
//     })
//   },
//
//   playCard: function(id) {
//     var game, player;
//
//     player = Players.findOne({
//       userId: this.userId,
//       cards: id
//     });
//     game = Games.findOne(player.gameId);
//     Games.update(game._id, {
//       $addToSet: {
//         'table.cards': id
//       }
//     });
//
//     return Players.update(player._id, {
//       $pull: {
//         cards: id
//       }
//     });
//   },
//   clearTable: function(game_id) {
//     return Games.update(game_id, {
//       $set: {
//         'table.cards': []
//       }
//     });
//   },
//   newRound: function(game_id) {
//     var game, players;
//     game = Games.findOne(game_id);
//     players = Players.find({
//       _id: {
//         $in: game.players
//       }
//     });
//     return players.forEach(function(p) {
//       var cards, num;
//       num = 10 - p.cards.length;
//       cards = game.whiteDeck.slice(0, num);
//       Players.update(p, {
//         $addToSet: {
//           cards: {
//             $each: cards
//           }
//         }
//       });
//       return Games.update(game, {
//         $pull: {
//           whiteDeck: {
//             $in: cards
//           }
//         }
//       });
//     });
//   }
// });
//
// newDeck = function(type) {
//   var cards;
//   cards = Cards.find({
//     type: type
//   }).fetch();
//   cards = _.pluck(cards, '_id');
//   return _.shuffle(cards);
// };
