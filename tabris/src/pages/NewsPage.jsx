import {Page, TextView} from 'tabris';

export class NewsPage extends Page {
  constructor(properties) {
    super();
    this.set({title: 'News', ...properties}).append(
      <TextView center>No news yet!</TextView>
    );
  }
};