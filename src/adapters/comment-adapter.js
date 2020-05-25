export default class CommentAdapter {
  constructor(serverComment) {
    this.id = serverComment[`id`];
    this.author = serverComment[`author`];
    this.comment = serverComment[`comment`];
    this.date = serverComment[`date`];
    this.emotion = serverComment[`emotion`];
  }

  toRAW() {
    return {
      'id': this.id,
      'author': this.author,
      'comment': this.comment,
      'date': this.date,
      'emotion': this.emotion
    };
  }

  static parseComment(serverComment) {
    return new CommentAdapter(serverComment);
  }

  static parseComments(serverComment) {
    return serverComment.map(CommentAdapter.parseComment);
  }
}
