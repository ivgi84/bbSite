import { BbsitePage } from './app.po';

describe('bbsite App', () => {
  let page: BbsitePage;

  beforeEach(() => {
    page = new BbsitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
